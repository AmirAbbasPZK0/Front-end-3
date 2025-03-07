"use client"
import { login } from "@/actions/login"
import { useActionState } from "react"

const FormHandler = () => {

    const [state , action] = useActionState(login , undefined)

    return(<>
        <form className="flex flex-col gap-2 w-[350px]" action={action}>
            <input className="text-black p-2 rounded-md" name="email" type="email" />
            <input className="text-black p-2 rounded-md" name="password" type="password" />
            <button type="submit">Submit</button>
        </form>
    </>)
}

export default FormHandler