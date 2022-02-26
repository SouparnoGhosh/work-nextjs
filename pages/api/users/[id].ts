import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  res.status(200).json({
    name: 'Koala',
    id: id,
    email: 'Fucked',
  })
}
