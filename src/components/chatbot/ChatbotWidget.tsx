import { useEffect } from 'react';

declare global {
  interface Window {
    TrusturConfig: {
      widgetType: string;
      agentId: string;
      position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
      size?: 'small' | 'medium' | 'large';
      theme?: number;
      primaryColor?: string;
      textColor?: string;
      secondaryColor?: string;
      useAgentColors?: boolean;
    };
  }
}

const ChatbotWidget = () => {
  useEffect(() => {
    // Set the configuration for the chatbot
    window.TrusturConfig = {
      widgetType: 'chat-bot',
      agentId: '79bb85cd-482c-4e98-8c9e-a9d2732867a3',
      position: 'bottom-right',
      size: 'medium',
      theme: 2,
      primaryColor: '#007bff',
      textColor: '#ffffff',
      secondaryColor: '#0056b3',
      useAgentColors: true,
    };

    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://trustur.ai/trustur-widget.js';
    script.async = true;
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load Trustur chatbot widget');
    };
    
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src="https://trustur.ai/trustur-widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // Clean up any iframe that might have been added by the widget
      const iframe = document.querySelector('iframe[src*="trustur.ai"]');
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ChatbotWidget;
