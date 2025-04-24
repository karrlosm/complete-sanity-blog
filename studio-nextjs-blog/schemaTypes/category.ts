import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Categoria',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Título',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Descrição',
        type: 'text',
        rows: 2,
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: Rule => Rule.required(),
      }),
    ],
  })