const { asyncRequest } = require('./utils')


const approvedReview = {
  body: `Your code is adequate enough given the
           limitations of your species.`,
  event: 'APPROVE',
}

const changeReview = {
  body: 'You sure this code implements the feature fully?',
  event: 'REQUEST_CHANGES',
}


const prReview = async (number, loc, points) => {

  const { data: { statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${number}/reviews`,
    'post',
    loc + 5 >= +points ? approvedReview : changeReview
  )

  statusCode !== 200 && console.log({ prReviewCode: statusCode })

}


const getIssuePoints = async issueNumber => {
  const { err, data:{ labels:[{ name:points }] } } = await asyncRequest(
    `/repos/iot-course/org/issues/${issueNumber}`
  )
  err && console.log({ getIssuePointsErr: err.message })
  return points
}

exports.handler = async (e, _, cb) => {

  const {
    action,
    number,
    pull_request:{
      // head:{ sha },
      body,
      additions,
      deletions
    }
  } = JSON.parse(e.body)


  const points = await getIssuePoints(body.replace(/^\D+/, ''))
  const loc = additions + deletions

  action === 'opened' && prReview(number, loc, points)

  cb(null, { statusCode: 200 })

}

/*
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus mauris, elementum ac hendrerit et, condimentum ut lacus. Nulla facilisi. Phasellus vel nisi a est fermentum sagittis dignissim at dui. Nulla dapibus imperdiet egestas. Vivamus imperdiet lorem tellus, tincidunt egestas sem fermentum eget. Nunc mattis vulputate eros, eu porta augue rutrum eget. Nam sollicitudin id arcu sed egestas. Pellentesque mollis dignissim diam elementum faucibus. Phasellus vitae interdum neque, vel blandit nisl. Aenean non lobortis augue.

Nullam enim velit, mattis et nunc ac, vestibulum aliquet mi. Nam a maximus dui, eu gravida tortor. Proin vel urna rutrum, finibus libero vitae, finibus ipsum. Aliquam cursus felis at lacus sollicitudin, ut malesuada quam mollis. In aliquam, lorem id vulputate scelerisque, nunc magna rutrum nulla, vitae imperdiet lorem justo nec felis. Proin tempus arcu quis mauris feugiat, id fermentum nisi mattis. Mauris ac nibh eget eros facilisis porta.

Etiam rhoncus lorem at sapien rhoncus vulputate. Aenean vehicula consequat mauris efficitur euismod. Donec imperdiet sit amet sapien eu ornare. Duis commodo turpis velit, et facilisis elit facilisis tincidunt. Duis tempor condimentum quam at faucibus. Quisque id iaculis velit. Vivamus sed ante fermentum, commodo metus sed, mattis mauris. Donec vitae magna pulvinar, semper ex quis, congue lorem. Cras volutpat dui vulputate dapibus eleifend. Nullam finibus a lectus ut dictum. Quisque finibus eros justo, vel malesuada ante pulvinar maximus. Pellentesque tincidunt sapien nisi, non faucibus libero maximus vitae. Sed quis commodo ligula, aliquam semper nisi. Phasellus tincidunt eget lacus quis pretium.

Suspendisse vehicula sit amet nisi et placerat. Integer a eros at purus rutrum luctus feugiat quis quam. Donec id dictum leo, imperdiet commodo odio. Sed iaculis posuere dapibus. Etiam dapibus mi ac mattis placerat. Nulla facilisi. Maecenas mi lectus, facilisis eget semper at, interdum ac diam.

Morbi efficitur velit vel felis ornare vestibulum. Nullam lorem ipsum, accumsan at metus quis, pulvinar volutpat turpis. Nullam mollis odio a dolor semper faucibus. Nulla vel tortor placerat, blandit justo nec, tincidunt quam. Morbi facilisis scelerisque eros, vel sollicitudin est rutrum pharetra. Vestibulum tempus a elit id scelerisque. Nunc a orci non metus eleifend ullamcorper sed a ligula.
*/
