import { options } from "@/config/next-auth";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import React from "react";

const Rules = async () => {
  const session = await getServerSession(options);
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Hi <b>{session?.fullName}</b>, if you want to become <b>teacher</b> of EST Edu, please send
        CV for us.
      </Typography>
      <Stack component={"ul"}>
        <Typography variant="body1" component={"li"}>
          <b> Contact Information:</b> Include your full name, professional title, phone number,
          email address, and optionally, your LinkedIn profile or personal website.
        </Typography>
        <Typography variant="body1" component={"li"}>
          <b>Education:</b> List your educational background, including degrees, certifications, and
          relevant IT courses or training programs you have completed. Include the institution name,
          degree/certification earned, and graduation year.
        </Typography>
        <Typography variant="body1" component={"li"}>
          <b> Technical Skills: </b>List your technical skills relevant to the IT field. Include
          programming languages, operating systems, databases, software, frameworks, tools, and any
          other relevant technologies you are proficient in.
        </Typography>
        <Typography variant="body1" component={"li"}>
          <b> Work Experience:</b> Detail your professional experience, starting with the most
          recent job. Include the company name, job title, employment dates, and a description of
          your responsibilities and achievements. Highlight projects you've worked on, technical
          solutions you've implemented, and any notable results or improvements.
        </Typography>
        <Typography variant="body1" component={"li"}>
          <b> Projects:</b> If applicable, mention any significant IT projects you have worked on.
          Provide a brief description of the project, your role, and the technologies or
          methodologies used. Highlight any notable achievements or outcomes.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Rules;
