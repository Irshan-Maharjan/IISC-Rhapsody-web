import React from 'react';
import { cn } from "../lib/utils";
import { ArrowLeft } from "lucide-react";

// Local Button Component to avoiding missing dependency issues
const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-red-900 to-black text-white font-bold hover:from-red-950 hover:to-black shadow-lg shadow-red-900/20"
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

const culturalEvents = [
    {
        title: "Dance",
        description: "Express yourself through movement and rhythm. Compete in various dance styles and formations.",
        subEvents: ["Group", "Solo", "Duet", "Synchro", "Battle"],
        image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: "https://forms.office.com/r/4wLJ8FBeEL",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7B4B065A0B-9B47-4386-B30B-91EE2C96651F%7D&file=Dance%20Event%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Art",
        description: "Unleash your creativity and imagination across various artistic mediums.",
        subEvents: ["Canvas Painting", "Junkyard architecture", "Live Sketching", "Art Relay", "Face Painting", "T Shirt Painting", "Comic Strip Making", "Doodle Art", "Dry Rangoli"],
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: "https://forms.office.com/r/UPZyJsURmW",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7B3DFA2193-677F-44AE-A555-020BA5EE788C%7D&file=Art%20Event%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Digital Arts",
        description: "Create stunning visuals using digital tools. Show off your design skills.",
        subEvents: ["Poster Making", "Logo Making", "Book Cover Design"],
        image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
        link: "https://forms.office.com/r/Mzwmx05G0H",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7B26A053E0-4848-4D6D-87C2-5970C3C41D9C%7D&file=Digital%20Art%20Event%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Digital Media Arts",
        description: "Tell stories and capture moments through lenses and screens.",
        subEvents: ["Digital Ad Making", "Short Film Making", "Documentary", "Photography", "Videography"],
        image: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: "https://forms.office.com/r/VQLSynLK4H",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7BD3CD01C9-32CD-4B03-8835-497FBDD0FD79%7D&file=Digital%20Media%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Music",
        description: "Let the melodies flow. Compete in vocal and instrumental musical events.",
        subEvents: ["Battle of Bands", "Duet Singing", "Solo Singing", "Group Instrumental", "Rap Battle", "Beatboxing"],
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: "https://forms.office.com/r/fSzECsTSND",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7BD41EBD0A-C6AC-45F7-97EF-8FDA9C43A3DE%7D&file=Music%20Event%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Business Event",
        description: "Test your corporate skills and strategic thinking in competitive business scenarios.",
        subEvents: [
            { name: "Case Craft", link: "https://unstop.com/p/casecraft-2026-rhapsody-indian-institute-of-science-1652404" },
            { name: "Biz Master Quiz Wars", link: "https://unstop.com/p/bizmaster-quiz-wars-rhapsody-indian-institute-of-science-1652413" },
            { name: "The Data Decode Challenge", link: "https://unstop.com/p/the-data-decode-challenge-rhapsody-indian-institute-of-science-1652430" },
            { name: "Flash strategy arena", link: "https://unstop.com/p/flashstrategy-arena-rhapsody-indian-institute-of-science-1652462" }
        ],
        image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/personal/tahasaquib_iisc_ac_in/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Ftahasaquib%5Fiisc%5Fac%5Fin%2FDocuments%2FRhapsody%2026%2FRhapsody%20Culturals%2FBusiness%20Event%20Rules%20Rhapsody%204%2E0%2Epdf&parent=%2Fpersonal%2Ftahasaquib%5Fiisc%5Fac%5Fin%2FDocuments%2FRhapsody%2026%2FRhapsody%20Culturals"
    },
    {
        title: "Literary Arts",
        description: "Celebrate the power of words through innovative writing and literary challenges.",
        subEvents: ["Lexicon", "Story relay", "Con fiction", "X compose"],
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: "https://forms.office.com/r/0VaDEDHSBq",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7BAA5B4A4B-713A-41A9-85B3-43D98CB63AD9%7D&file=Literary%20art%20event%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Speaking Arts",
        description: "Captivate the audience with your voice, wit, and rhetorical skills.",
        subEvents: ["Standup Comedy", "English debate", "Poetry Slam Competition", "Extempore"],
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: "https://forms.office.com/r/izgrTZ0yAv",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7B4AA34A7E-92DB-4AFA-885B-E014EAC6C552%7D&file=Speaking%20Arts%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Dramatics",
        description: "Bring characters to life on stage and street. Express through the art of acting.",
        subEvents: ["Street play", "Stage play", "Mono acting", "Character representation", "Ad Spoof"],
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80",
        color: "from-[#E2E2E2]/30 to-transparent",
        link: "https://forms.office.com/r/1sC68Qx4m2",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/:w:/r/personal/tahasaquib_iisc_ac_in/_layouts/15/Doc.aspx?sourcedoc=%7B87696432-F251-4BDC-9C62-02AA7C193DB9%7D&file=Dramatics%20Rules%20Rhapsody%204.0.docx&action=default&mobileredirect=true"
    },
    {
        title: "Lifestyle",
        description: "Showcase fashion, style, and creativity on the runway.",
        subEvents: ["Theme Walk", "Fashion Show", "Best out of Waste"],
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#220202]/30 to-transparent",
        link: null // Coming Soon
    },
    {
        title: "Quiz",
        description: "Test your knowledge across various domains in thrilling quiz formats.",
        subEvents: ["General", "MELA", "Biz-Tech", "Sports", "Hands-on-Science"],
        image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&w=800&q=80",
        color: "from-[#FFB800]/30 to-transparent",
        link: "https://forms.office.com/r/u3QGULR5yF",
        rulebookLink: "https://indianinstituteofscience-my.sharepoint.com/personal/tahasaquib_iisc_ac_in/_layouts/15/onedrive.aspx?ga=1&id=%2Fpersonal%2Ftahasaquib%5Fiisc%5Fac%5Fin%2FDocuments%2FRhapsody%2026%2FRhapsody%20Culturals%2FRhapsody%20Quizzes%20Rulebook%2Epdf&parent=%2Fpersonal%2Ftahasaquib%5Fiisc%5Fac%5Fin%2FDocuments%2FRhapsody%2026%2FRhapsody%20Culturals"
    }
];

const CulturalEventsSection = ({ onClose, onOpenEventDetail }) => {
    // Stop/Start Lenis when modal opens/closes
    React.useEffect(() => {
        window.lenis?.stop();
        document.body.style.overflow = 'hidden';
        return () => {
            window.lenis?.start();
            document.body.style.overflow = 'unset';
            // Trigger refresh after closing modal as layout might shift
            setTimeout(() => {
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            }, 100);
        };
    }, []);

    return (
        <section
            id="cultural-events"
            data-lenis-prevent
            className="fixed inset-0 z-[150] bg-[#0a0202] overflow-y-auto overflow-x-hidden min-h-screen animate-fade-in"
        >
            {/* Full Container Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1514525253361-bee8d40d96d7?auto=format&fit=crop&w=1920&q=80"
                    alt="Cultural Background"
                    className="w-full h-full object-cover opacity-40 brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0202]/80 via-transparent to-[#0a0202]/95" />
            </div>

            {/* Sticky Navigation Header */}
            <div className="sticky top-0 left-0 w-full z-[160] flex justify-center px-6 md:px-12 py-8 pointer-events-none">
                <button
                    onClick={onClose}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-[#FFB800] hover:text-black transition-all duration-300 group shadow-[0_0_20px_rgba(255,184,0,0.25)]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Events</span>
                </button>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                <div className="text-center mb-16 relative">
                    <span className="text-[#FFB800] font-medium uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">
                        The Soul of Rhapsody
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter shadow-2xl drop-shadow-lg">
                        CULTURAL <span className="text-[#FFB800] drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]">LINEUP</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        From the rhythm of the streets to the grace of the stage. Witness the ultimate celebration of talent and creativity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 animate-fade-in relative z-20">
                    {culturalEvents.map((event, index) => (
                        <div
                            key={index}
                            onClick={() => onOpenEventDetail && onOpenEventDetail(event)}
                            className="group relative bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFB800]/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,184,0,0.2)] block cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} z-10`} />
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    loading="lazy"
                                />
                                {/* Cultural texture overlay */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative z-20 flex flex-col h-[calc(100%-14rem)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                                    <h3 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-[#FFB800] transition-colors">
                                        {event.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light flex-grow line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                                        {event.subEvents?.length || 0} Categories
                                    </span>
                                    <button className="text-[10px] text-[#FFB800] uppercase font-bold tracking-widest group-hover:translate-x-1 transition-transform">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CulturalEventsSection;
