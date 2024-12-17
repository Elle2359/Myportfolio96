interface PreviewSelection {
  keyQualifications?: string[]
}

export default {
  name: 'cv',
  title: 'CV',
  type: 'document',
  preview: {
    select: {
      keyQualifications: 'keyQualifications'
    },
    prepare(selection: PreviewSelection) {
      const { keyQualifications } = selection
      const mainQualification = keyQualifications?.[0] || 'No qualifications added'
      
      return {
        title: 'CV',
        subtitle: mainQualification
      }
    }
  },
  fields: [
    {
      name: 'keyQualifications',
      title: 'Key Qualifications',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'period', title: 'Period', type: 'string'},
            {name: 'company', title: 'Company', type: 'string'},
            {name: 'role', title: 'Role', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
        },
      ],
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'period', title: 'Period', type: 'string'},
            {name: 'institution', title: 'Institution', type: 'string'},
            {name: 'degree', title: 'Degree', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
        },
      ],
    },
  ],
}
