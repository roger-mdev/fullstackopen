const Status = ({ type, message}) => {
const baseStyle = {
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
}

const style = {
  success: {
    ...baseStyle,
    color: "green",
  },
  failure: {
    ...baseStyle,
    color: "red",
  },
}

  return (
    <div style={style[type]}>
      {message}
    </div>
  )
}

export default Status