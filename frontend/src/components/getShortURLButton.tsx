import { Button } from "@chakra-ui/react"
import { FormEvent } from "react"
import styles from "../global.module.css"

interface getShortURLProps {
  onSubmit: (event: FormEvent) => void
}

function GetShortURLButton({ onSubmit }: getShortURLProps) {
  return (
    <Button
      className={`${styles["button"]} ${styles["get-short-url"]}`}
      type="submit"
      onClick = {onSubmit}
    >
      Get Shortened URL
    </Button>
  )
}

export default GetShortURLButton
