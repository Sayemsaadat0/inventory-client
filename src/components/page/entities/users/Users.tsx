import UsersForm from "./UsersForm"

const Users = () => {
    return (
        <div>
            <UsersForm handleFormSubmit={() => undefined} isLoading={false} />
        </div>
    )
}

export default Users