import React from "react";

class ErrorBoundary extends React.Component<{children: React.ReactNode, componentName: string}, {hasError: boolean}> {
  state = {
    hasError: false
  };

  
  static getDerivedStateFromError(error: any) {
    console.log(error);
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return {hasError: true};
  }

  
  // componentDidCatch (error: any, errorInfo: any) {
  //   //Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  //
  // }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h3>Что-то пошло не так.</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
