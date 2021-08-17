import React from 'react'
import EmployerApplicationControl from '../../layouts/EmployerApplicationControl'

export default function EmployerApplicants() {
    return (
        <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EmployerApplicationControl />
    </div>
    )
}
