import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> tests', () => {
  let component
  let mockLikeHandler
  let testUser

  beforeEach(() => {
    const blog = {
      title: 'birds and windows',
      author: 'Apolo',
      url: 'apolo.com',
      likes: '100',
      user: {
        username: 'apolo weber'
      }
    }

    const user = {
      username: 'apolo weber'
    }

    mockLikeHandler = jest.fn()
    testUser = userEvent.setup()

    component = render(
      <Blog blog={blog} user={user} handleLike={mockLikeHandler}/>
    )
  })

  test('render title and name, hide the rest', () => {
    expect(component.container).toHaveTextContent(
      'birds and windows'
    )

    const element = component.getByText('Apolo')
    expect(element).toBeDefined()

    const hiden = component.container.querySelector('.hidenData')
    expect(hiden).toHaveStyle('display:none')
  })

  test('clicking button shows url and likes', () => {
    const element = component.container.querySelector('.hidenData')

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(element).not.toHaveStyle('display:none')
  })

  test('double clicking on like', async () => {

    const likeButton = component.container.querySelector('.likeButton')

    await testUser.dblClick(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})


