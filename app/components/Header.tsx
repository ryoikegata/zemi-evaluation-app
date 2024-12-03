import { Sidebar } from "./SideBar"

type HeaderProps = {
  user: Omit<{
    id: number
    student_id: string
    name: string
    email: string
    password: string
    group_id: number
    role_id: number
    createdAt: string
  }, 'password'>
}

export const Header = ({user}: HeaderProps) => {

return (
  <header className="w-screen bg-white z-10 fixed flex justify-between p-5 shadow-md mb-4">
  <div>
  <p className="text-xl">{user.name}<span className="text-sm">さん</span></p>
  </div>
  <div>
  <Sidebar user={user} />
  </div>
</header>
)
};