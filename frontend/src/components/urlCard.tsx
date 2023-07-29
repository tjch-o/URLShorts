import { Card, CardBody, Text } from "@chakra-ui/react"

interface CardProps {
  url: String
}

function URLCard({ url }: CardProps) {
  return (
    <Card bg = "transparent">
      <CardBody>
        <Text fontFamily = "Fira Sans, san-serif" color = "#FDE992" > http://localhost:5000/{url} </Text>
      </CardBody>
    </Card>
  )
}

export default URLCard
