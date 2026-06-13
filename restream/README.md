# Restream goattv → HLS (Oracle Cloud Always Free)

Pull goattv's **single** connection once and re-serve it as HLS to unlimited
viewers. Free forever on Oracle Cloud (10 TB/month egress).

> ⚠️ goattv `max_connections=1` → this box streams **ONE channel at a time**
> (the live match). To run several channels you'd need more goattv connections.

## 1. Create the free VM (Oracle Cloud)
1. cloud.oracle.com → create account (Always Free).
2. **Create Instance** → Image **Ubuntu 22.04**, Shape **VM.Standard.A1.Flex**
   (Ampere ARM — Always Free: up to 4 OCPU / 24 GB).
3. Add your SSH key, create. Note the **public IP**.
4. **Networking → Security List → Ingress rules**: allow TCP **80** and **443**
   from `0.0.0.0/0`.
5. On the VM also open the firewall:
   ```bash
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
   sudo netfilter-persistent save
   ```

## 2. Install + deploy
```bash
sudo apt update && sudo apt install -y ffmpeg nginx
sudo mkdir -p /var/www/hls && sudo chown -R www-data:www-data /var/www/hls

# copy the 3 files from this folder to the VM, then:
sudo cp restream.sh /opt/restream.sh && sudo chmod +x /opt/restream.sh
sudo cp nginx-hls.conf /etc/nginx/sites-available/hls
sudo ln -sf /etc/nginx/sites-available/hls /etc/nginx/sites-enabled/hls
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo cp wc-restream.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now wc-restream
```

Test: `http://<VM_PUBLIC_IP>/hls/bein-max-2.m3u8` should return a playlist, and
open in VLC to confirm it plays.

## 3. HTTPS via Cloudflare (free — required, site is HTTPS)
The site is HTTPS, so the stream URL must be HTTPS too (no mixed content).
1. Add a DNS record (in Cloudflare, your domain): `stream.sportalive.live` → A →
   `<VM_PUBLIC_IP>`, **proxied (orange cloud ON)**.
2. Cloudflare SSL/TLS mode: **Flexible** (CF↔visitor HTTPS, CF↔origin HTTP:80).
3. Now `https://stream.sportalive.live/hls/bein-max-2.m3u8` works over HTTPS,
   and Cloudflare **caches segments** → absorbs the viewer load for free.

## 4. Point the site to the restream
In `src/lib/wc-channels.ts`, change the live match channel's `streamUrl` to:
```
https://stream.sportalive.live/hls/bein-max-2.m3u8
```
(`.m3u8` → the player uses hls.js; it's HTTPS+CORS so it bypasses the Vercel
proxy and streams straight from Cloudflare.) Commit + deploy.

## Change the live channel
Edit `wc-restream.service` ExecStart (e.g. `/opt/restream.sh 299 bein-max-1`),
then `sudo systemctl daemon-reload && sudo systemctl restart wc-restream`.

## Check / debug
- `journalctl -u wc-restream -f` — ffmpeg logs.
- `ls -la /var/www/hls/` — segments should appear/rotate every ~6s.
