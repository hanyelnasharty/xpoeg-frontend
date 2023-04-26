import React from "react"
import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from "../components/Add"
import Edit from "../components/Edit"

const Recommendations = (props) => {

    const [recommendations, setRecommendations] = useState([])

  const getRecommendations = () => {
    axios.get('http://localhost:8000/api/recommendations').then(
      (response) => setRecommendations(response.data),
      (err) => console.log(err)
    ).catch((error) => console.error(error))
  }

  const handleCreate = (recommendation) => {
    axios.post('http://localhost:8000/api/recommendations', recommendation).then((response) => {
      console.log(response)
      getRecommendations()
    }).catch((error) => {
      console.log(error.response)
    })
  }

  const handleDelete = (event) => {
    axios.delete('http://localhost:8000/api/recommendations/' + event.target.value)
    .then((response) => {
      getRecommendations()
    })
  }

  const handleUpdate = (editRecommendation) => {
    axios.put('http://localhost:8000/api/recommendations/' + editRecommendation.id, editRecommendation)
    .then((response) => {
      getRecommendations()
    })
  }

  useEffect(() => {
    getRecommendations()
  }, [])
    return (
        <>
            <h1 className="header">User Recommendations</h1>
            <h3>Add your recommendations below!</h3>
            <Add 
                handleChange={props.handleChange} 
                handleSubmit={props.handleSubmit} 
                handleCreate={handleCreate}
                recommendation={props.recommendation}
                />
                {recommendations.map((recommendation) => {
                return (
                    <div>
                        <h3>Name: {recommendation.name}</h3>
                        <h4>Government: {recommendation.gov}</h4>
                        <p>Recommendation: {recommendation.description}</p>
                        <Edit 
                            handleDelete={props.handleDelete}
                            handleUpdate={handleUpdate}
                            recommendation={props.recommendation}
                        />
                        <button type="button" onClick={handleDelete} value={recommendation.id}>Delete</button>
                    </div>
                    
                )
            })}
       
           
        </>
        
    )
}

export default Recommendations