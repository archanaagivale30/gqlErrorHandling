const { errorType } = require('./errorContant')

const getErrorCode = errorName => {
  return errorType[errorName]
}

module.exports = getErrorCode
