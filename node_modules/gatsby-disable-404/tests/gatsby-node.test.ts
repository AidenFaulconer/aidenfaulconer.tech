import { onCreatePage } from '../src/gatsby-node'

describe('Plugin', () => {
  let deletePage
  let createPage
  let actions

  describe('Basics', () => {
    it('exports onCreatePage function', () => {
      expect(onCreatePage).not.toBeInstanceOf(() => undefined)
    })
  })

  beforeEach(() => {
    deletePage = jest.fn()
    createPage = jest.fn()

    actions = { deletePage, createPage }
  })

  describe('onCreatePage', () => {
    describe('deletePage', () => {
      it('is called for /404/ path', () => {
        const page = { path: '/404/' }

        onCreatePage({ page, actions })

        expect(deletePage).toHaveBeenCalledWith(page)
        expect(createPage).not.toHaveBeenCalled()
      })

      it('is called for /dev-404-page/ path', () => {
        const page = { path: '/dev-404-page/' }

        onCreatePage({ page, actions })

        expect(deletePage).toHaveBeenCalledWith(page)
        expect(createPage).not.toHaveBeenCalled()
      })
    })

    describe('createPage', () => {
      it('is called for /example path', () => {
        const page = { path: '/example' }

        onCreatePage({ page, actions })

        expect(deletePage).not.toHaveBeenCalled()
        expect(createPage).toHaveBeenCalledWith(page)
      })
    })
  })
})
