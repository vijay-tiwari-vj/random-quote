import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const QuoteBox = () => {
  const [quotes, setQuotes] = useState(JSON.parse(localStorage.getItem('quotes')) || [])
  const [ quoteText, setQuoteText ] = useState('')
  const [ quoteAuthor, setQuoteAuthor ] = useState('')
  const getQuotes = () => {
    const random_quote = quotes[Math.floor(Math.random() * quotes.length)]
    const quote = random_quote ? random_quote['quoteText'] : <div>Loading...</div>
    const author = random_quote ? random_quote['quoteAuthor'] : <div>Loading...</div>
    
    setQuoteText(quote)
    setQuoteAuthor(author)
  }

  useEffect(() => {
    const fetchQuotes = async () => {
      const url = 'https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json'
      const response = await Axios.get(url)
      const data = await response.data
      
      localStorage.setItem('quotes', JSON.stringify(data))
      setQuotes(data)
    }
    fetchQuotes().catch(error => {
      console.log(error)
    })
    getQuotes()
  }, [])

  return (
    <div id="quote-box">
      <div id="quote-text">
        <i className="fa fa-quote-left"> </i>
        <span id="text">{ quoteText && quoteText }</span>
      </div>
      <div id="author">
        - { quoteAuthor ? quoteAuthor : <em>Unknown</em> }
      </div>

      <div className="buttons">
        <a id="tweet-quote" href="twitter.com/intent/tweet"><i className="fab fa-twitter"> </i></a>
        
        <button id="new-quote" onClick={getQuotes}>New quote</button>
      </div>
      
    </div>
  )
}

export default QuoteBox
