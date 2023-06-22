import React from 'react'

const RequestVerification = () => {

    // 
    const submitHandler = (e) => {
        e.preventDefault()
        
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Email Address: </label>
                <input class="form-control" type="email" placeholder="Enter your email address" aria-label="default input example" />
                <button 
                    className="btn btn-sm bg-gradient-info mt-2"
                    type="submit"
                >Request Verification
                </button>
            </form>
        </div>
    )
  
}

export default RequestVerification