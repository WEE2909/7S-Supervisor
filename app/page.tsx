
"use client";

import { useState } from "react";
import {
  LayoutDashboard, ClipboardList, ClipboardCheck,
  BarChart3, Users, Search, Bell, Menu, X,
  Plus, Clock3, CheckCircle2, AlertCircle,
  Leaf, CalendarDays, MoreHorizontal
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  area: string;
  owner: string;
  status: string;
};

const initialTasks: Task[] = [
  {
    id: "7S-026",
    title: "ทำความสะอาดห้องปฏิบัติการคอมพิวเตอร์",
    area: "อาคาร 3 ห้อง 302",
    owner: "แผนกเทคโนโลยีสารสนเทศ",
    status: "รอตรวจ"
  },
  {
    id: "7S-025",
    title: "จัดระเบียบพื้นที่จัดเก็บอุปกรณ์",
    area: "ห้องพัสดุ",
    owner: "งานพัสดุ",
    status: "กำลังดำเนินการ"
  },
  {
    id: "7S-024",
    title: "ตรวจสอบความสะอาดบริเวณทางเดิน",
    area: "อาคาร 1 ชั้น 1",
    owner: "งานอาคารสถานที่",
    status: "อนุมัติแล้ว"
  },
  {
    id: "7S-023",
    title: "คัดแยกเอกสารที่ไม่จำเป็น",
    area: "ห้องธุรการ",
    owner: "งานธุรการ",
    status: "ต้องแก้ไข"
  }
];

const menus = [
  { name: "ภาพรวมระบบ", icon: LayoutDashboard },
  { name: "จัดการงาน 7ส", icon: ClipboardList },
  { name: "ตรวจสอบหลักฐาน", icon: ClipboardCheck },
  { name: "รายงานผล", icon: BarChart3 },
  { name: "จัดการผู้ใช้งาน", icon: Users }
];

export default function Home() {
  const [active, setActive] = useState("ภาพรวมระบบ");
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ทั้งหมด");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");

  const filteredTasks = tasks.filter(task => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.area.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "ทั้งหมด" || task.status === filter;

    return matchSearch && matchFilter;
  });

  const waiting = tasks.filter(t => t.status === "รอตรวจ").length;
  const approved = tasks.filter(t => t.status === "อนุมัติแล้ว").length;
  const revision = tasks.filter(t => t.status === "ต้องแก้ไข").length;

  function addTask(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !area.trim()) return;

    setTasks([
      {
        id: "7S-" + String(Date.now()).slice(-4),
        title,
        area,
        owner: "ยังไม่ได้มอบหมาย",
        status: "กำลังดำเนินการ"
      },
      ...tasks
    ]);

    setTitle("");
    setArea("");
    setShowForm(false);
  }

  return (
    <main className="app">

      {mobileMenu && (
        <button
          className="overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>

        <div className="brand">
          <div className="brand-icon">
            <Leaf size={25}/>
          </div>

          <div>
            <h2>7S <span>SUPERVISOR</span></h2>
            <small>ระบบจัดการงานความสะอาด</small>
          </div>

          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
          >
            <X/>
          </button>
        </div>

        <p className="menu-title">เมนูหลัก</p>

        <nav>
          {menus.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`menu-item ${
                  active === item.name ? "selected" : ""
                }`}
                onClick={() => {
                  setActive(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19}/>
                {item.name}

                {item.name === "ตรวจสอบหลักฐาน" && waiting > 0 && (
                  <span className="menu-badge">{waiting}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <Leaf size={22}/>
            <h4>พื้นที่สะอาด เริ่มต้นที่เรา</h4>
            <p>ร่วมกันสร้างสภาพแวดล้อมที่ดีด้วยหลัก 7ส</p>
          </div>

          <div className="admin-profile">
            <div className="avatar">AD</div>
            <div>
              <strong>ผู้ดูแลระบบ</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>

      </aside>

      <section className="main-area">

        <header className="topbar">
          <div className="top-left">
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenu(true)}
            >
              <Menu/>
            </button>

            <span>7S Supervisor / <b>{active}</b></span>
          </div>

          <div className="top-right">
            <span className="date">
              <CalendarDays size={16}/>
              12 พฤศจิกายน 2569
            </span>

            <button className="notification">
              <Bell size={20}/>
            </button>

            <div className="avatar">AD</div>
          </div>
        </header>

        <div className="content">

          <div className="welcome">
            <div>
              <span className="eyebrow">ADMINISTRATION</span>
              <h1>
                {active === "ภาพรวมระบบ"
                  ? "สวัสดี ผู้ดูแลระบบ 👋"
                  : active}
              </h1>
              <p>ยินดีต้อนรับเข้าสู่ระบบจัดการงาน 7ส</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={18}/>
              สร้างงานใหม่
            </button>
          </div>

          <div className="stats">

            <div className="stat-card">
              <div className="stat-head">
                <span>งานทั้งหมด</span>
                <ClipboardList/>
              </div>
              <h2>{tasks.length + 20}</h2>
              <small>รายการงานในระบบ</small>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>รอตรวจสอบ</span>
                <Clock3/>
              </div>
              <h2>{waiting + 7}</h2>
              <small>รอผู้ดูแลตรวจสอบ</small>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>อนุมัติแล้ว</span>
                <CheckCircle2/>
              </div>
              <h2>{approved + 11}</h2>
              <small>ผ่านการตรวจสอบ</small>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>ต้องแก้ไข</span>
                <AlertCircle/>
              </div>
              <h2>{revision + 3}</h2>
              <small>ส่งกลับเพื่อแก้ไข</small>
            </div>

          </div>

          <div className="section-heading">
            <div>
              <h2>รายการงานล่าสุด</h2>
              <p>ติดตามสถานะการดำเนินงาน</p>
            </div>
          </div>

          <section className="task-box">

            <div className="toolbar">
              <div className="filters">
                {[
                  "ทั้งหมด",
                  "รอตรวจ",
                  "กำลังดำเนินการ",
                  "อนุมัติแล้ว",
                  "ต้องแก้ไข"
                ].map(item => (
                  <button
                    key={item}
                    className={filter === item ? "filter-active" : ""}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="search">
                <Search size={17}/>
                <input
                  placeholder="ค้นหางาน..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ชื่องาน</th>
                    <th>พื้นที่</th>
                    <th>ผู้รับผิดชอบ</th>
                    <th>สถานะ</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map(task => (
                    <tr key={task.id}>
                      <td>
                        <strong>{task.title}</strong>
                        <small>{task.id}</small>
                      </td>

                      <td>{task.area}</td>
                      <td>{task.owner}</td>

                      <td>
                        <span className={
                          "status " +
                          (task.status === "อนุมัติแล้ว"
                            ? "green"
                            : task.status === "รอตรวจ"
                            ? "orange"
                            : task.status === "ต้องแก้ไข"
                            ? "red"
                            : "blue")
                        }>
                          {task.status}
                        </span>
                      </td>

                      <td>
                        <MoreHorizontal size={19}/>
                      </td>
                    </tr>
                  ))}

                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={5}>ไม่พบรายการงาน</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              แสดง {filteredTasks.length} รายการ
              <span>ข้อมูลตัวอย่าง</span>
            </div>

          </section>

          <div className="bottom-grid">

            <section className="info-card">
              <h3>ความคืบหน้าการดำเนินงาน</h3>
              <p>ภาพรวมการทำงานประจำเดือน</p>

              <div className="progress-number">75%</div>

              <div className="progress">
                <div/>
              </div>

              <small>ความคืบหน้าโดยรวม</small>
            </section>

            <section className="info-card">
              <h3>ทางลัดการทำงาน</h3>

              <button onClick={() => setShowForm(true)}>
                <Plus size={19}/>
                มอบหมายงานใหม่
              </button>

              <button onClick={() => setActive("ตรวจสอบหลักฐาน")}>
                <ClipboardCheck size={19}/>
                ตรวจสอบหลักฐาน
              </button>

            </section>

          </div>

          <footer>
            © 2026 7S Supervisor · ระบบจัดการงานความสะอาดตามหลัก 7ส
          </footer>

        </div>
      </section>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={addTask}>
            <h2>สร้างงาน 7ส ใหม่</h2>

            <label>ชื่องาน</label>
            <input
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ระบุชื่องาน"
            />

            <label>พื้นที่รับผิดชอบ</label>
            <input
              required
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder="ระบุพื้นที่"
            />

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                ยกเลิก
              </button>

              <button type="submit" className="save-button">
                เพิ่มงาน
              </button>
            </div>
          </form>
        </div>
      )}

    </main>
  );
}
