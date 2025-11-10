
const FooterObj = () => {
    const contributor1Name = "Jennifer H."
    const contributor1Link = "https://github.com/jennifermhansson"
    const contributor2Name = "M. Leon"
    const contributor2Link = "https://github.com/moooshooo"

    return (
        <>
            <footer>
                <p className="copyrighttxt">FOS25 | Copy it's your right 2025</p>
                <p className="autorsCreds">Kudos: <a href={contributor1Link} target="_blank">{contributor1Name}</a> & <a href={contributor2Link} target="_blank">{contributor2Name}</a><br/><a href="https://github.com/jennifermhansson/beanbutton" target="_blank">repo</a></p>
            </footer>
        </>
    )
}
export default FooterObj