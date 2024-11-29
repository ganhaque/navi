'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";

export async function getEmailCookie() {
  const response = await fetch('/api/email-cookie', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  if (response.ok) {
    const data = await response.json();
    console.log('Email Cookie:', data);
    /* console.log("Email Cookie", data.value); */
    return data;
  } else {
    const errorData = await response.json();
    console.error('Failed:', errorData);
  }
}

function SiteHeader() {
  /* const pathname = usePathname() */
  /* const { */
  /*   setSelectedTheme */
  /* } = useThemeContext(); */
  /* const [email, setEmail] = useState(""); */
  /**/
  /* useEffect(() => { */
  /*   async function doStuff() { */
  /*     const email = await getEmailCookie(); */
  /*     console.log(email); */
  /*     setEmail(email); */
  /*   } */
  /*   doStuff(); */
  /* }, []); */
  /**/
  /* async function signOut() { */
  /*   const response = await fetch('/api/signout', { */
  /*     method: 'GET', */
  /*     headers: { */
  /*       'Content-Type': 'application/json', */
  /*     }, */
  /*   }); */
  /*   console.log(response); */
  /**/
  /*   if (response.ok) { */
  /*     const data = await response.json(); */
  /*     console.log('Response:', data); */
  /*     location.reload(); */
  /*     return data; */
  /*   } else { */
  /*     const errorData = await response.json(); */
  /*     console.error('Failed:', errorData); */
  /*   } */
  /* } */


  return (
    <header style={{
      display: "flex",
      borderBottomWidth: "1px",
      /* borderColor: "hsla(var(--white), 0.2)", */
      /* backgroundColor: "hsla(var(--darkest_black))", */
      backgroundColor: "hsla(var(--black))",
      /* backgroundColor: darken("hsla(var(--black))", 0.2), */
      height: "3rem",
      width: "100%",
      zIndex: "50",
      position: "sticky",
      top: "0",
      alignItems: "center",
      justifyItems: "center",
      paddingLeft: "0.25rem",
      paddingRight: "0.25rem",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        height: "2.5rem",
        width: "2.5rem",
      }}>
        <SidebarTrigger />
      </div>
      {/* <div style={{ */}
      {/*   display: "flex", */}
      {/*   alignItems: "center", */}
      {/*   maxWidth: "96rem", */}
      {/*   width: "100%", */}
      {/*   height: "3.5rem", */}
      {/*   marginRight: "auto", */}
      {/*   marginLeft: "auto", */}
      {/*   paddingLeft: "2rem", */}
      {/*   paddingRight: "2rem", */}
      {/* }}> */}
      {/*   <div style={{ */}
      {/*     display: "flex", */}
      {/*     gap: "1.75rem", */}
      {/*     alignItems: "center", */}
      {/*   }}> */}
      {/*     <Link */}
      {/*       style={{ */}
      {/*         display: "flex", */}
      {/*         gap: "0.5rem", */}
      {/*         color: "hsla(var(--white))", */}
      {/*       }} */}
      {/*       href="/" */}
      {/*     > */}
      {/*       [~] */}
      {/*       <div> */}
      {/*         PCB */}
      {/*       </div> */}
      {/*     </Link> */}
      {/**/}
      {/*     <nav */}
      {/*       style={{ */}
      {/*         display: "flex", */}
      {/*         alignItems: "center", */}
      {/*         gap: "1.25rem", */}
      {/*       }} */}
      {/*     > */}
      {/*       <Link */}
      {/*         style={pathname === "/" ? { */}
      {/*           borderBottomWidth: "1px", */}
      {/*         } : {}} */}
      {/*         href="/" */}
      {/*         className="white-border-bottom-on-hover" */}
      {/*       > */}
      {/*         home */}
      {/*       </Link> */}
      {/*       <Link */}
      {/*         style={pathname.startsWith("/builder") ? { */}
      {/*           borderBottomWidth: "1px", */}
      {/*         } : {}} */}
      {/*         className="white-border-bottom-on-hover" */}
      {/*         href="/builder" */}
      {/*       > */}
      {/*         builder */}
      {/*       </Link> */}
      {/**/}
      {/**/}
      {/*       <DropdownMenu> */}
      {/*         <DropdownMenuTrigger asChild> */}
      {/*           <div style={{ */}
      {/*             display: "flex", */}
      {/*             alignItems: "center", */}
      {/*           }} */}
      {/*             className="white-border-bottom-on-hover" */}
      {/*           > */}
      {/*             products */}
      {/*             <MdKeyboardArrowDown style={{ */}
      {/*               width: "1.125rem", */}
      {/*               height: "1.125rem", */}
      {/*             }} /> */}
      {/*           </div> */}
      {/*         </DropdownMenuTrigger> */}
      {/*         <DropdownMenuContent align="end"> */}
      {/**/}
      {/*           {categories.map((category, index) => ( */}
      {/**/}
      {/*             <Link */}
      {/*               key={index} */}
      {/**/}
      {/*               href={`/products?category=${category}`} */}
      {/*             > */}
      {/*               {category} */}
      {/*             </Link> */}
      {/**/}
      {/*           ))} */}
      {/*         </DropdownMenuContent> */}
      {/*       </DropdownMenu> */}
      {/**/}
      {/*       <Link */}
      {/*         style={pathname.startsWith("/guide") ? { */}
      {/*           borderBottomWidth: "1px" */}
      {/*         } : {}} */}
      {/*         className="white-border-bottom-on-hover" */}
      {/*         href="/guide" */}
      {/*       > */}
      {/*         guides */}
      {/*       </Link> */}
      {/*       <Link */}
      {/*         style={pathname.startsWith("/chat") ? { */}
      {/*           borderBottomWidth: "1px" */}
      {/*         } : {}} */}
      {/*         className="white-border-bottom-on-hover" */}
      {/*         href="/chat" */}
      {/*       > */}
      {/*         chat */}
      {/*       </Link> */}
      {/*     </nav> */}
      {/*   </div> */}
      {/**/}
      {/*   <div style={{ */}
      {/*     display: "flex", */}
      {/*     marginLeft: "auto", */}
      {/*     gap: "1.5rem", */}
      {/*     alignItems: "center", */}
      {/*   }}> */}
      {/*     {(email === "") ? ( */}
      {/*       <div style={{ */}
      {/*         display: "flex", */}
      {/*         marginLeft: "auto", */}
      {/*         gap: "0.125rem", */}
      {/*         alignItems: "center", */}
      {/*       }}> */}
      {/*         <Link */}
      {/*           style={pathname.startsWith("/login") ? { */}
      {/*             borderBottomWidth: "1px" */}
      {/*           } : {}} */}
      {/*           className="white-border-bottom-on-hover" */}
      {/*           href="/login" */}
      {/*         > */}
      {/*           login */}
      {/*         </Link> */}
      {/*         <div style={{ */}
      {/*         }}> */}
      {/*           / */}
      {/*         </div> */}
      {/*         <Link */}
      {/*           style={pathname.startsWith("/register") ? { */}
      {/*             borderBottomWidth: "1px" */}
      {/*           } : {}} */}
      {/*           className="white-border-bottom-on-hover" */}
      {/*           href="/register" */}
      {/*         > */}
      {/*           register */}
      {/*         </Link> */}
      {/*       </div> */}
      {/*     ) : ( */}
      {/*       <DropdownMenu> */}
      {/*         <DropdownMenuTrigger asChild> */}
      {/*           <div style={{ */}
      {/*             display: "flex", */}
      {/*             alignItems: "center", */}
      {/*           }} */}
      {/*             className="white-border-bottom-on-hover" */}
      {/*           > */}
      {/*             {email} */}
      {/*             <MdKeyboardArrowDown style={{ */}
      {/*               width: "1.125rem", */}
      {/*               height: "1.125rem", */}
      {/*             }} /> */}
      {/*           </div> */}
      {/*         </DropdownMenuTrigger> */}
      {/*         <DropdownMenuContent align="end"> */}
      {/*           <DropdownMenuItem */}
      {/*             onSelect={() => { signOut() }} */}
      {/*           > */}
      {/*             Sign out */}
      {/*           </DropdownMenuItem> */}
      {/*         </DropdownMenuContent> */}
      {/*       </DropdownMenu> */}
      {/*     )} */}
      {/**/}
      {/*     <div style={{ */}
      {/*       display: "flex", */}
      {/*       marginLeft: "auto", */}
      {/*       gap: "0.25rem", */}
      {/*       alignItems: "center", */}
      {/*     }}> */}
      {/*       <Link */}
      {/*         href="https://github.com/AlyxWhipp/CSC4330ProjectGroupB" */}
      {/*         target="_blank" */}
      {/*         rel="noreferrer" */}
      {/*         className="ghost-button" */}
      {/*       > */}
      {/*         <FaGithub style={{ */}
      {/*           width: "1.125rem", */}
      {/*           height: "1.125rem", */}
      {/*         }} /> */}
      {/*       </Link> */}
      {/**/}
      {/*       <DropdownMenu> */}
      {/*         <DropdownMenuTrigger asChild> */}
      {/*           <button className="ghost-button"> */}
      {/*             <RxSun style={{ */}
      {/*               width: "1.25rem", */}
      {/*               height: "1.25rem", */}
      {/*             }} /> */}
      {/*           </button> */}
      {/*         </DropdownMenuTrigger> */}
      {/*         <DropdownMenuContent align="end"> */}
      {/*           {Object.entries(ThemeMap).map(([themeKey, theme]) => ( */}
      {/*             <DropdownMenuItem */}
      {/*               key={themeKey} */}
      {/*               onSelect={() => { */}
      {/*                 setSelectedTheme(themeKey); */}
      {/*               }}> */}
      {/*               {theme.label} */}
      {/*             </DropdownMenuItem> */}
      {/*           ))} */}
      {/*         </DropdownMenuContent> */}
      {/*       </DropdownMenu> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
      {/**/}
    </header>
  )
}

export default SiteHeader;
