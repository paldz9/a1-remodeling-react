export interface WorkProject {
  id: string
  title: string
  description: string
  /** All images — first is used as the main thumbnail */
  images: string[]
}

/**
 * Add a new entry here whenever a folder is added to /public/our work/.
 * Image paths are relative to /public — use %20 for spaces or rename folders.
 * Vite serves /public contents at the root URL: "/our work/Folder/main.avif"
 */
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
  // ─── Add more projects below as new folders are created ───
  // {
  //   id: 'kitchen-remodel',
  //   title: 'Kitchen Remodel',
  //   description: '...',
  //   images: [
  //     '/our work/Kitchen Remodel/Main.avif',
  //     '/our work/Kitchen Remodel/img_1.avif',
  //   ],
  // },
]
