
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(/About.jpg);
    width: 100%;
    height: 320px;
    background-position: center 45%;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">AhadDev</Typography>
                <Text variant="h5">I'm a Mern Full Stack Engineer based in India. 
                    I've built websites, desktop applications and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Skahad" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                        or send me an Email if you have any questions.
                        <Link href="mailto:sahad3889@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
