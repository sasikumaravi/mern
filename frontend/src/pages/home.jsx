import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <GoogleLogin onSuccess={(CredentialReponse) => {
                // console.log(jwtDecode(CredentialReponse.credential));
                navigate('/menu',{state:jwtDecode(CredentialReponse.credential)})
            }}
                onError={() => console.log('Something went wrong...')}
            />

        </>
    )
}
