import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title of blog article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug of yur blog article',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description',
        validation: (rule) => rule.required(),
     }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'views',
      title: 'Visualizações',
      type: 'number',
      initialValue: 0,
      readOnly: true, // evita que o editor altere manualmente
    })
  ],
})