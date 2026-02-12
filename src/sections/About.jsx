const About = () => {
  return (
    <section id="about"  className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
        <div className="w-full flex flex-col h-auto">
            <div className="flex flex-col w-full text-start">
                <h1 className="text-4xl font-bold ml-5 md:ml-10 md:text-8xl heading">About Me</h1>
                <div className="bg-orange-500 w-full h-0.5"/>
            </div>
            <div className="font-light">
                <div className="w-full h-auto text-[1rem] p-5 md:text-4xl">
                    <div id="title-about-1">
                        <p>Game Developer</p>
                    </div>
                    <div id="title-about-2" className=" mt-5 flex items-center justify-center gap-3 translate-x-16">
                        <p className="font-bold">Game Designer</p>
                        <div className="w-10 h-1 md:w-32 bg-orange-500"/>
                        <p>Game Programmer</p>
                    </div>
                    <div id="title-about-3" className=" mt-5 flex item-center justify-center gap-3 -translate-x-48">
                        <p>UI/UX Designer</p>
                        <div className=" mt-5 w-10 h-1 md:w-32 bg-orange-500"/>
                        <p className="font-bold">3D Artist</p>
                        <div className=" mt-5 w-10 h-1 md:w-32 bg-orange-500"/>
                        <p>Animator</p>
                    </div>
                    <div id="title-about-4" className="mt-5 flex item-center justify-center gap-3 translate-x-16">
                        <p className="font-bold">Electronics Engineer</p>
                        <div className=" mt-5 w-10 h-1 md:w-32 bg-orange-500"/>
                        <p>VLSI Design</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About