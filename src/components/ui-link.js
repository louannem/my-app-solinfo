import style from "@/style/ui-link.module.css";

export default function UiLink(data) {
    return(
        <a href={data.url} className={style.uiLink}>
            {data.label}
        </a>
    )
}