import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, submitQuoteRequest, submitServiceInquiry, ContactFormData, QuoteRequestData, ServiceInquiryData } from '@/lib/api';

export function useFormSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleContactForm = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const response = await submitContactForm(data);
      
      if (response.success) {
        toast({
          title: "Message Sent!",
          description: response.message,
          variant: "default",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to send message",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuoteRequest = async (data: QuoteRequestData) => {
    setIsLoading(true);
    try {
      const response = await submitQuoteRequest(data);
      
      if (response.success) {
        toast({
          title: "Quote Request Submitted!",
          description: response.message,
          variant: "default",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to submit quote request",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceInquiry = async (data: ServiceInquiryData) => {
    setIsLoading(true);
    try {
      const response = await submitServiceInquiry(data);
      
      if (response.success) {
        toast({
          title: "Inquiry Submitted!",
          description: response.message,
          variant: "default",
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to submit inquiry",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleContactForm,
    handleQuoteRequest,
    handleServiceInquiry,
  };
}
