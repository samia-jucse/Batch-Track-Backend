const updateBatchTestCases = [
  {
      description: 'should update batch and return success message',
      mock: {
          findByPk: { result: { id: '1', name: 'Old Name', email: 'oldemail@example.com', password: 'oldpassword' } },
          update: { result: [1] } // returns 1 to indicate one record was updated
      },
      input: {
          headers: { id: '1' },
          body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' }
      },
      expected: {
          status: 200,
          json: { message: 'Update successful.', data: [1] }
      }
  },
  {
      description: 'should return 404 if batch not found',
      mock: {
          findByPk: { result: null }
      },
      input: {
          headers: { id: '1' },
          body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' }
      },
      expected: {
          status: 404,
          json: { message: 'Batch not found.' }
      }
  },
  {
      description: 'should return 500 if an error occurs',
      mock: {
          findByPk: { error: new Error('Something went wrong') }
      },
      input: {
          headers: { id: '1' },
          body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' }
      },
      expected: {
          status: 500,
          json: { message: 'Something went wrong' }
      }
  }
];