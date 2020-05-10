import React from "react";

import "./code-of-conduct-page.style.scss";

import { ReactComponent as CodeOfConductVector } from "../../assets/graphics/undraw_terms_lso0.svg";

const CodeOfConduct = () => {

    return(
        <div className="about-page">
        <div className="about-page-container">
            <div className="purpose-container">
                <CodeOfConductVector className="about-picture"/>
                <div className="about-content">
                    <div className="about-header">
                    code of conduct
                    </div>
                    <div className="codes">

                    <div className="code-header">1. Be inclusive</div>
                    We welcome and support people of all backgrounds and identities. This includes, but is not limited to members of any sexual orientation, gender identity and expression, race, ethnicity, culture, national origin, social and economic class, educational level, color, immigration status, sex, age, size, family status, political belief, religion, and mental and physical ability.

                    <br/><br/><div className="code-header">2. Be considerate</div>
                    We all depend on each other to produce the best work we can as a company. Your decisions will affect clients and colleagues, and you should take those consequences into account when making decisions.

                    
                    <br/><br/><div className="code-header">3. Be respectful</div>
                    We won't all agree all the time, but disagreement is no excuse for disrespectful behavior. We will all experience frustration from time to time, but we cannot allow that frustration become personal attacks. An environment where people feel uncomfortable or threatened is not a productive or creative one.

                    
                    <br/><br/><div className="code-header">4. Choose your words carefully</div>
                    Always conduct yourself professionally. Be kind to others. Do not insult or put down others. Harassment and exclusionary behavior aren't acceptable. This includes, but is not limited to:
                    <br/><br/>
                    <li>Threats of violence.</li>
                    <li>Insubordination.</li>
                    <li>Discriminatory jokes and language.</li>
                    <li>Sharing sexually explicit or violent material via electronic devices or other means.</li>
                    <li>Personal insults, especially those using racist or sexist terms.</li>
                    <li>Unwelcome sexual attention.</li>
                    <li>Advocating for, or encouraging, any of the above behavior.</li>

                    <br/><br/><div className="code-header">5. Don't harass</div>
                    
                    In general, if someone asks you to stop something, then stop. When we disagree, try to understand why. Differences of opinion and disagreements are mostly unavoidable. What is important is that we resolve disagreements and differing views constructively.

                    <br/><br/><div className="code-header">6. Make differences into strengths</div>
                    
                    We can find strength in diversity. Different people have different perspectives on issues, and that can be valuable for solving problems or generating new ideas. Being unable to understand why someone holds a viewpoint doesn’t mean that they’re wrong. Don’t forget that we all make mistakes, and blaming each other doesn’t get us anywhere.

                    Instead, focus on resolving issues and learning from mistakes.
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CodeOfConduct;
