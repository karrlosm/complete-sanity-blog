import { defineType, defineField } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Foto de Perfil',
      type: 'image',
      options: {
        hotspot: true, // permite foco manual da imagem
      },
      validation: Rule => Rule.required(),
    }),
  ],
})
