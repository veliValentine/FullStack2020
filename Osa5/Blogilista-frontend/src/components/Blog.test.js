import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let component

const blog = {
  title: 'Otsikko',
  author: 'Kirjoittaja',
  url: 'URL',
  likes: 0,
  user: {
    name: 'nimi',
    id: 'hi'
  }
}

const loggedUser = {
  name: 'loggedUser',
  id: 'hi'
}

beforeEach(() => {
  component = render(
    <Blog blog={blog} loggedUser={loggedUser} />
  )
})

describe('<Blog />', () => {
  test('renders hidden blog correctly', () => {
    const div = component.container.querySelector('.hiddenBlog')

    expect(div).not.toHaveStyle('display: none')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
  })

  test('blogs can be fully displayed', () => {
    const div = component.container.querySelector('.blogInfo')

    expect(div).toHaveStyle('display: none')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

  test('cliking like twice calls function twice', () => {
    //const mockHandler = jest.fn()

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)


  })
})