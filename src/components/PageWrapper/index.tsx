import { ReactNode } from 'react';
import Container from '@mui/material/Container';

interface PageWrapperProps {
    children: ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <Container maxWidth="lg">
            {children}
        </Container>
    );
}

export default PageWrapper;
