import Item from './Item'
import { Tabs } from '@components/Tabs'

type Project = {
  title: string
  date: string
  thumbnail: string
  slug: string
}

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="my-32">
      <Tabs>
        <div className="space-x-8">
          <Tabs.Tab value="0" label="Projects"/>
          <Tabs.Tab value="1" label="Archive"/>
        </div>

        <Tabs.Panel value="0">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12 mt-12">
            {
              projects?.map((p) => {
                return <Projects.Item key={p.title} {...p} />
              })
            }
          </div>
        </Tabs.Panel>
      </Tabs>
    </section>
  );
};

Projects.Item = Item

export default Projects