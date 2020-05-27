import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders hidden blog correctly', () => {
    const blog = {
      title: 'Otsikko',
      author: 'Kirjoittaja',
      url: 'URL',
      user: {
        name: 'nimi',
        id: 'hi'
      }
    }

    const loggedUser = {
      name: 'loggedUser',
      id: 'hi'
    }

    const component = render(
      <Blog blog={blog} loggedUser={loggedUser} />
    )

    const div = component.container.querySelector('.hiddenBlog')

    expect(div).toHaveTextContent('Otsikko')
    expect(div).toHaveTextContent('Kirjoittaja')
    expect(div).not.toHaveTextContent('URL')
    expect(div).not.toHaveTextContent('0')
  })
})