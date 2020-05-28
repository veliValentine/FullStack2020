import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { prettyDom } from '@testing-library/dom'

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

describe('<Blog />', () => {
  beforeEach(() => {
    component = render(
      <Blog blog={blog} loggedUser={loggedUser} />
    )
  })
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
})
describe('<Blog /> buttons', () => {
  test('cliking like twice calls function twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeBlog={mockHandler} loggedUser={loggedUser} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)

    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})