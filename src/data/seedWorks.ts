import type { WorksData } from '../types/works'

/** Fallback categories so Works never stays empty if fetch fails. */
export const seedWorksData: WorksData = {
  groups: [
    {
      id: 'cat-logo-design',
      name: 'Logo design',
      slug: 'logo-design',
      description: 'Distinctive marks built to scale across print and screen.',
      coverImage:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
      items: [
        {
          id: 'item-northline',
          title: 'Northline',
          description: 'Logo and brand mark for a mobility startup.',
          website: 'https://example.com',
          images: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      ],
    },
    {
      id: 'cat-social-media',
      name: 'Social media design',
      slug: 'social-media-design',
      description: 'Feed systems and creatives that stay on-brand.',
      coverImage:
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
      items: [
        {
          id: 'item-pulse',
          title: 'Pulse Co.',
          description: 'Social kit and campaign creatives for product launches.',
          images: [
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      ],
    },
    {
      id: 'cat-website-design',
      name: 'Website design',
      slug: 'website-design',
      description: 'Websites aligned with the brand system.',
      coverImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      items: [
        {
          id: 'item-horizon',
          title: 'Horizon',
          description: 'Marketing site design aligned with the brand system.',
          website: 'https://example.com',
          images: [
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      ],
    },
  ],
}
