import React, { ErrorInfo } from "react";
import { Component} from "react";

import ErrorMessage from "../error/ErrorMessage.tsx"; 

interface IStateError {
    error: boolean
}

class ErrorBoundary extends Component<{children: React.ReactNode}> { 
    state:IStateError = { 
        error: false
    }

    componentDidCatch(error: unknown, errorInfo: unknown) { 
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