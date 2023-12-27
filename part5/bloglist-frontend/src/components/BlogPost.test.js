import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogPost from './BlogPost'

describe('<BlogPost /> component tests', () => {
  test('Form call the controller with all the form data', () => {
    const mockBlogPost = jest.fn()

    const component = render(
      <BlogPost blogPostHandler={mockBlogPost} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'The art of sleeping' }
    })

    fireEvent.change(author, {
      target: { value: 'Apolo Schmickler' }
    })

    fireEvent.change(url, {
      target: { value: 'apolo.com' }
    })


    fireEvent.submit(form)

    expect(mockBlogPost.mock.calls).toHaveLength(1)
    expect(mockBlogPost.mock.calls[0][0].title).toBe('The art of sleeping')
    expect(mockBlogPost.mock.calls[0][0].author).toBe('Apolo Schmickler')
    expect(mockBlogPost.mock.calls[0][0].url).toBe('apolo.com')
  })
})