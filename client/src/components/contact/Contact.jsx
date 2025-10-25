import { Box, styled, Typography, Link } from '@mui/material';
import { Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(/Contact.jpg);
    width: 100%;
    height: 320px;
    background-position: center 39%;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    I'm currently open for new opportunities.
                    You can send me an Email 
                    <Link href="mailto:sahad3889@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;