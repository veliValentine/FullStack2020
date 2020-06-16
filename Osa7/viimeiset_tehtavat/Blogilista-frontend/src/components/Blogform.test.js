import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Callback function gets correct blogObject when adding new blog', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const blogObject = {
      title: 'titleTest',
      author: 'authorTest',
      url: 'urlTest',
    }

    //Find and fill title, author and url with blogObject data
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: blogObject.title }
    })
    fireEvent.change(author, {
      target: { value: blogObject.author }
    })
    fireEvent.change(url, {
      target: { value: blogObject.url }
    })

    //Send filled form
    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    //Be sure that form was send only once
    expect(createBlog.mock.calls).toHaveLength(1)

    const createBlogObject = createBlog.mock.calls[0][0]

    //Check that send blog equals to received blog
    expect(createBlogObject).toEqual(blogObject)
  })
})