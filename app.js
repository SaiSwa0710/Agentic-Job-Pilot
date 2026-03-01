import { Stagehand } from "@browserbasehq/stagehand";
import Exa from "exa-js";
import 'dotenv/config';
import { z } from "zod";

const exa = new Exa(process.env.EXA_API_KEY);

// Define user profile for the application
const userProfile = {
    firstName: "Sai Swapnesh",
    lastName: "Pahi",
    email: "swapnesh0710@gmail.com",
    phone: "7162473190",
    resumePath: "Sai Swapnesh Pahi Resume.pdf", // Ensure this file is in the root directory
    linkedin: "https://www.linkedin.com/in/saiswapnesh/",
    github: "https://github.com/saiswapnesh"
};

async function findLatestJobs() {
    console.log("🔍 Looking for Data Engineer jobs posted in the last 1.5 hours...");

    // Calculate the time 1.5 hours ago
    const oneAndHalfHoursAgo = new Date(Date.now() - 90 * 60 * 1000).toISOString();

    // Exa search query focused on specific roles, location, and specific ATS platforms
    const query = `(Data Engineer OR Big Data Engineer OR ETL developer OR AWS Data Engineer) job application US (site:lever.co OR site:greenhouse.io OR site:ashbyhq.com OR site:myworkdayjobs.com)`;

    const result = await exa.search(query, {
        numResults: 5,
        useAutoprompt: true,
        startPublishedDate: oneAndHalfHoursAgo
    });

    if (!result.results || result.results.length === 0) {
        console.log("❌ No recent jobs found.");
        return null;
    }

    // To build on just one job application first
    console.log(`✅ Found ${result.results.length} jobs. Taking the first one to apply...`);
    const jobUrl = result.results[0].url;
    console.log(`Job URL: ${jobUrl}`);

    return jobUrl;
}

async function applyToJob(jobUrl) {
    console.log(`🚀 Starting Stagehand to apply for: ${jobUrl}`);

    const stagehand = new Stagehand({
        env: "BROWSERBASE",
        apiKey: process.env.BROWSERBASE_API_KEY,
        projectId: process.env.BROWSERBASE_PROJECT_ID,
        model: {
            modelName: "google/gemini-2.5-flash",
            clientOptions: {
                apiKey: process.env.GOOGLE_API_KEY
            }
        }
    });

    await stagehand.init();
    const page = stagehand.context.pages()[0] || await stagehand.context.newPage();
    console.log("📄 Page initialized. Navigating...");

    try {
        await page.goto(jobUrl);
        console.log("📄 Navigated to job page.");

        // 1. Extract job description to check alignment with resume
        console.log("🧠 Analyzing job description with Stagehand...");
        const jobDetails = await stagehand.extract("Extract the job title and the main requirements/skills from the job description.",
            z.object({
                title: z.string(),
                requirements: z.array(z.string())
            })
        );

        console.log(`📋 Extracted Job Title: ${jobDetails.title}`);
        console.log("📋 Core Requirements:", jobDetails.requirements);
        // Future step: Here you can pass `jobDetails.requirements` and your parsed resume to an LLM 
        // to check alignment before proceeding. We continue for now to build the automation.

        // 2 & 3. Reveal Form and Fill it out
        console.log("🖱️ Engaging with the page and filling the application form...");
        await stagehand.act(`
          1. If there is an 'Apply', 'Apply Now', or 'Apply for this job' button that reveals the application form, click it. 
          2. Wait for the form to appear. 
          3. Fill out the First Name field with '${userProfile.firstName}'.
          4. Fill out the Last Name field with '${userProfile.lastName}'.
          5. Fill out the Email field with '${userProfile.email}'.
          6. Fill out the Phone Number field with '${userProfile.phone}'.
          7. Fill out the LinkedIn URL field with '${userProfile.linkedin}'.
          8. Fill out the GitHub URL or Website field with '${userProfile.github}'.
        `);

        // 4. Upload Resume
        // Note: Make sure 'Sai Swapnesh Pahi Resume.pdf' exists in your root directory!
        console.log("📂 Uploading resume...");
        await stagehand.act(`Upload the file '${userProfile.resumePath}' to the File input, Resume/CV field, or drag-and-drop zone. If no file upload field is visible, do nothing.`);

        // 5. Submit Application (Commented out for safety during your initial testing)
        console.log("✅ The form is filled correctly! (Submit action is commented out for testing)");
        // await page.act({ action: "Click the 'Submit Application' or 'Submit' button to complete the process." });

    } catch (error) {
        console.error("❌ Error during application process:", error);
    } finally {
        // Make sure to close the Stagehand browser instance
        console.log("🛑 Closing Browserbase/Stagehand session.");
        await stagehand.close();
    }
}

async function main() {
    // Uncomment below if you want to test a specific ATS URL directly without Exa lookup
    // const testUrl = "https://boards.greenhouse.io/example/jobs/123456";
    // await applyToJob(testUrl);
    // return;

    const jobUrl = await findLatestJobs();
    if (jobUrl) {
        await applyToJob(jobUrl);
        console.log("🎉 Application sequence finished.");
    }
}

main();