import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInPage, Testimonial } from '@/components/ui/sign-in';
import { toast } from 'sonner';

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: 'https://randomuser.me/api/portraits/women/57.jpg',
    name: 'Sarah Chen',
    handle: '@sarahcreates',
    text: 'The custom 3D printed phone stand I ordered exceeded my expectations! Perfect finish and super fast delivery.',
  },
  {
    avatarSrc: 'https://randomuser.me/api/portraits/men/64.jpg',
    name: 'Marcus Johnson',
    handle: '@marcusmaker',
    text: 'MimCraft Lab printed my architectural model flawlessly. The layer detail and accuracy are incredible for the price.',
  },
  {
    avatarSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'David Martinez',
    handle: '@daviddesigns',
    text: 'Ordered personalized keychains for my business - customers love them! Already planning my next bulk order.',
  },
];

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // TODO: Implement actual authentication with Lovable Cloud
    console.log('Sign In:', { email, password });
    toast.success(isSignUp ? 'Account created successfully!' : 'Signed in successfully!');
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    toast.info('Google sign-in coming soon!');
  };

  const handleResetPassword = () => {
    toast.info('Password reset coming soon!');
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <SignInPage
      heroImageSrc="https://images.unsplash.com/photo-1631544685755-a2a9bd22e2a5?w=1200&h=1600&fit=crop"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      isSignUp={isSignUp}
      onToggleMode={handleToggleMode}
    />
  );
};

export default Auth;
