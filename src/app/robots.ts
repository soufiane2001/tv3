import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sportalive.live';
  const disallow = ['/soufianski', '/api/'];
  return {
    rules: [
      { userAgent: '*',            allow: '/', disallow },
      // AI & LLM crawlers — explicitly welcome for content indexing
      { userAgent: 'GPTBot',       allow: '/', disallow },
      { userAgent: 'ChatGPT-User', allow: '/', disallow },
      { userAgent: 'ClaudeBot',    allow: '/', disallow },
      { userAgent: 'anthropic-ai', allow: '/', disallow },
      { userAgent: 'PerplexityBot',allow: '/', disallow },
      { userAgent: 'Brave-Search', allow: '/', disallow },
      { userAgent: 'Google-Extended', allow: '/', disallow },
      { userAgent: 'CCBot',        allow: '/', disallow },
      { userAgent: 'cohere-ai',    allow: '/', disallow },
      { userAgent: 'Meta-ExternalAgent', allow: '/', disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
