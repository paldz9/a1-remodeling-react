export interface WorkProject {
  id: string
  title: string
  description: string
  /** All images — first is used as the main thumbnail */
  images: string[]
}

export const OUR_WORK_PROJECTS: WorkProject[] = [
  {
    id: 'exterior-home-transformation',
    title: 'Exterior Home Transformation',
    description:
      'A complete exterior refresh that transforms this home from simple to standout. With updated finishes, elegant stone accents, and a redesigned entryway, this project adds depth, character, and a strong first impression while elevating the overall curb appeal.',
    images: [
      '/our work/Exterior Home Transformation/Main.avif',
      '/our work/Exterior Home Transformation/img_0.avif',
      '/our work/Exterior Home Transformation/img_4.avif',
      '/our work/Exterior Home Transformation/img_46.avif',
      '/our work/Exterior Home Transformation/img_5.avif',
      '/our work/Exterior Home Transformation/img_6.avif',
      '/our work/Exterior Home Transformation/img_7.avif',
    ],
  },
  {
    id: 'exterior-paint-roofing-upgrade',
    title: 'Exterior Paint & Roofing Upgrade',
    description:
      'From worn and outdated to clean and refreshed, this transformation highlights the impact of a new roof and updated exterior paint. The improved color and finish bring a brighter, more modern look, while the new roofing adds durability and protection. A simple upgrade that makes a lasting difference in both style and function.',
    images: [
      '/our work/Exterior Paint & Roofing Upgrade/main.avif',
      '/our work/Exterior Paint & Roofing Upgrade/img_2.avif',
    ],
  },
  {
    id: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    description:
      'A complete kitchen transformation that blends style and functionality. With updated finishes, modern cabinetry, and a refreshed layout, this space is now brighter, more efficient, and built for everyday living. A true upgrade that brings comfort and elegance into the heart of the home.',
    images: [
      '/our work/Kitchen Remodeling/main.avif',
      '/our work/Kitchen Remodeling/img_16.avif',
      '/our work/Kitchen Remodeling/img_17.avif',
    ],
  },
  {
    id: 'pavement-installation',
    title: 'Pavement Installation',
    description:
      'A fresh pavement installation that transforms the space into a cleaner, more functional, and visually appealing area. With smooth finishes and improved structure, this upgrade enhances both accessibility and overall curb appeal while adding long-lasting durability.',
    images: [
      '/our work/Pavement Installation/main.avif',
      '/our work/Pavement Installation/img_12.avif',
      '/our work/Pavement Installation/img_13.avif',
      '/our work/Pavement Installation/img_14.avif',
    ],
  },
  {
    id: 'roofing-upgrade',
    title: 'Roofing Upgrade',
    description:
      'A worn roof replaced with a clean, durable new system that enhances both protection and appearance. This upgrade not only strengthens the home against the elements but also gives it a fresh, well-maintained look that lasts for years to come.',
    images: [
      '/our work/Roofing Upgrade/main.avif',
      '/our work/Roofing Upgrade/img_10.avif',
    ],
  },
]
