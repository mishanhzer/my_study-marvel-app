import React, { ErrorInfo } from "react";
import { Component, useEffect, useState } from "react";

import ErrorMessage from "../error/ErrorMessage"; 

interface IError {
    children: React.FC | string
}

interface test {
    error: boolean
}

class ErrorBoundary extends Component<{children: React.ReactNode}> { 
    state:test = { 
        error: false
    }

    componentDidCatch(error: unknown, errorInfo: unknown) { // или тип Error и ErrorInfo
        console.log(error)
        console.log(errorInfo)
        this.setState({ 
            error: true
        })
    }

    render() { 
        if (this.state.error) { 
            return <ErrorMessage />
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;