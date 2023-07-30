import { Card, CardBody, Text } from "@chakra-ui/react"

interface CardProps {
  url: String
}

function URLCard({ url }: CardProps) {
  const apiEndPoint = process.env.REACT_APP_BACKEND_API_ENDPOINT

  return (
    <Card bg = "transparent">
      <CardBody>
        <Text fontFamily = "Fira Sans, san-serif" color = "#FDE992" > {`${apiEndPoint}/${url}`} </Text>
      </CardBody>
    </Card>
  )
}

export default URLCard