import axios from 'axios'

export const addEvent = async (name, timestamp, info, totalTickets) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/addevent`, {
      name,
      timestamp,
      info,
      totalTickets,
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}
export const handleBuyTicket = async (eventId, addr) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/buytik`, {
      eventId,
      addr,
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}
