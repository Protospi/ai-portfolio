'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { renderToStaticMarkup } from 'react-dom/server'
import { 
  FaDatabase, FaCalendar, FaTools, FaGlobe, FaRobot, FaServer, 
  FaChartLine, FaUser, FaMobile, FaCloud, FaCode, FaDesktop, 
  FaComments, FaMap, FaCamera, FaCar, FaUsers, FaFileAlt, 
  FaSearch, FaMicrophone, FaTree, FaWater, FaHeartbeat, 
  FaMapMarkerAlt, FaShoppingCart, FaChurch, FaLanguage, 
  FaImage, FaHeart, FaHotel, FaTrain, FaGraduationCap, 
  FaBus, FaShieldAlt, FaWifi, FaGamepad, FaSatellite, 
  FaFingerprint, FaLock, FaHospital, FaPlane, FaIndustry, 
  FaBook, FaCross, FaMoneyBill, FaUniversity, FaUtensils, 
  FaDollarSign, FaPrescriptionBottleAlt, FaHardHat, FaCloudSun, 
  FaMountain, FaDog, FaCat, FaDove, FaDumbbell, FaLightbulb, FaStar,
  FaFacebook, FaGithub, FaTiktok, FaTwitter, FaGoogle, 
  FaLinkedin, FaInstagram
} from 'react-icons/fa'

interface Node extends d3.SimulationNodeDatum {
  id: number
  icon: string
}

interface Link {
  source: number
  target: number
}

export default function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove()

    // Get dimensions
    const width = window.innerWidth
    const height = window.innerHeight

    // Create nodes with different icon types
    const nodes: Node[] = [
      { id: 0, icon: 'user', x: width/2, y: height/2 }, // User node at center
      { id: 1, icon: 'tools', x: width/3, y: height/2 },
      { id: 2, icon: 'server', x: 2*width/3, y: height/2 },
      { id: 3, icon: 'robot', x: width/3, y: 2*height/3 },
      { id: 4, icon: 'database', x: 2*width/3, y: 2*height/3 },
      { id: 5, icon: 'globe', x: width/2, y: height/3 },
      { id: 6, icon: 'chart', x: width/2, y: 2*height/3 },
      { id: 7, icon: 'mobile', x: width/4, y: height/3 },
      { id: 8, icon: 'cloud', x: 3*width/4, y: height/3 },
      { id: 9, icon: 'api', x: width/4, y: 2*height/3 },
      { id: 10, icon: 'display', x: 3*width/4, y: 2*height/3 },
      { id: 11, icon: 'chatbot', x: width/3, y: height/4 },
      { id: 12, icon: 'map', x: 2*width/3, y: height/4 },
      { id: 13, icon: 'camera', x: width/3, y: 3*height/4 },
      { id: 14, icon: 'car', x: 2*width/3, y: 3*height/4 },
      { id: 15, icon: 'users', x: width/4, y: height/2 },
      { id: 16, icon: 'document', x: 3*width/4, y: height/2 },
      { id: 17, icon: 'search', x: width/2, y: height/4 },
      { id: 18, icon: 'microphone', x: width/2, y: 3*height/4 },
      { id: 19, icon: 'calendar', x: width/5, y: height/5 },
      { id: 20, icon: 'tree', x: 4*width/5, y: height/5 },
      { id: 21, icon: 'waves', x: width/6, y: 4*height/5 },
      { id: 22, icon: 'health', x: 5*width/6, y: 4*height/5 },
      { id: 23, icon: 'map-marker', x: 3*width/10, y: height/10 },
      { id: 24, icon: 'cart', x: 7*width/10, y: height/10 },
      { id: 25, icon: 'church', x: width/2, y: 9*height/10 },
      { id: 26, icon: 'translate', x: width/8, y: height/8 },
      { id: 27, icon: 'image', x: 7*width/8, y: height/8 },
      { id: 28, icon: 'heart', x: width/8, y: 7*height/8 },
      { id: 29, icon: 'hotel', x: 7*width/8, y: 7*height/8 },
      { id: 30, icon: 'train', x: 3*width/8, y: height/8 },
      { id: 31, icon: 'cap', x: 5*width/8, y: height/8 },
      { id: 32, icon: 'bus', x: 3*width/8, y: 7*height/8 },
      { id: 33, icon: 'shield', x: 5*width/8, y: 7*height/8 },
      { id: 34, icon: 'wifi', x: width/10, y: 3*height/10 },
      { id: 35, icon: 'controller', x: 9*width/10, y: 3*height/10 },
      { id: 36, icon: 'satellite', x: width/10, y: 7*height/10 },
      { id: 37, icon: 'fingerprint', x: 9*width/10, y: 7*height/10 },
      { id: 38, icon: 'lock', x: 2*width/10, y: 2*height/10 },
      { id: 39, icon: 'healthcare', x: 3*width/10, y: 3*height/10 },
      { id: 40, icon: 'airplane', x: 7*width/10, y: 3*height/10 },
      { id: 41, icon: 'factory', x: 3*width/10, y: 7*height/10 },
      { id: 42, icon: 'book', x: 7*width/10, y: 7*height/10 },
      { id: 43, icon: 'cross', x: 4*width/10, y: 4*height/10 },
      { id: 44, icon: 'plane', x: 6*width/10, y: 6*height/10 },
      { id: 45, icon: 'money', x: 4*width/10, y: 6*height/10 },
      { id: 46, icon: 'bank', x: 6*width/10, y: 4*height/10 },
      { id: 47, icon: 'utensils', x: 5*width/10, y: 5*height/10 },
      { id: 48, icon: 'currency', x: 3*width/10, y: 5*height/10 },
      { id: 49, icon: 'pharmacy', x: 7*width/10, y: 3*height/10 },
      { id: 50, icon: 'hospital', x: 3*width/10, y: 7*height/10 },
      { id: 51, icon: 'construction', x: 5*width/10, y: 5*height/10 },
      { id: 52, icon: 'weather', x: 7*width/10, y: 3*height/10 },
      { id: 53, icon: 'mountain', x: 3*width/10, y: 7*height/10 },
      { id: 54, icon: 'dog', x: 5*width/10, y: 5*height/10 },
      { id: 55, icon: 'cat', x: 7*width/10, y: 5*height/10 },
      { id: 56, icon: 'bird', x: 3*width/10, y: 3*height/10 },
      { id: 57, icon: 'chef-hat', x: 5*width/10, y: 3*height/10 },
      { id: 58, icon: 'dumbbells', x: 7*width/10, y: 5*height/10 },
      { id: 59, icon: 'idea', x: 3*width/10, y: 5*height/10 },
      { id: 60, icon: 'star', x: 5*width/10, y: 7*height/10 },
      { id: 61, icon: 'facebook', x: 2*width/10, y: 2*height/10 },
      { id: 62, icon: 'github', x: 8*width/10, y: 2*height/10 },
      { id: 63, icon: 'tiktok', x: 2*width/10, y: 8*height/10 },
      { id: 64, icon: 'twitter', x: 8*width/10, y: 8*height/10 },
      { id: 65, icon: 'ai', x: 4*width/10, y: 2*height/10 },
      { id: 66, icon: 'google', x: 6*width/10, y: 2*height/10 },
      { id: 67, icon: 'linkedin', x: 4*width/10, y: 8*height/10 },
      { id: 68, icon: 'instagram', x: 6*width/10, y: 8*height/10 }
    ]
    
    // Define links between nodes to form triangular structures with user at center
    const links: Link[] = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 0, target: 5 },
      { source: 0, target: 6 }, // User connected to all nodes
      { source: 0, target: 7 },
      { source: 0, target: 8 },
      { source: 0, target: 9 },
      { source: 0, target: 10 },
      { source: 0, target: 11 },
      { source: 0, target: 12 },
      { source: 0, target: 13 },
      { source: 0, target: 14 },
      { source: 0, target: 15 },
      { source: 0, target: 16 },
      { source: 0, target: 17 },
      { source: 0, target: 18 },
      { source: 0, target: 19 },
      { source: 0, target: 20 },
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 3, target: 1 },
      { source: 4, target: 2 },
      { source: 7, target: 11 },
      { source: 8, target: 2 },
      { source: 9, target: 2 },
      { source: 10, target: 6 },
      { source: 11, target: 3 },
      { source: 12, target: 5 },
      { source: 15, target: 17 },
      { source: 16, target: 6 },
      { source: 17, target: 16 },
      { source: 18, target: 11 },
      { source: 19, target: 11 },
      { source: 20, target: 12 },
      { source: 20, target: 8 },
      { source: 21, target: 14 },
      { source: 22, target: 15 },
      { source: 23, target: 12 },
      { source: 24, target: 16 },
      { source: 25, target: 13 },
      { source: 0, target: 26 },
      { source: 0, target: 27 },
      { source: 0, target: 28 },
      { source: 0, target: 29 },
      { source: 0, target: 30 },
      { source: 0, target: 31 },
      { source: 0, target: 32 },
      { source: 0, target: 33 },
      { source: 26, target: 5 },
      { source: 27, target: 13 },
      { source: 28, target: 22 },
      { source: 29, target: 25 },
      { source: 30, target: 14 },
      { source: 31, target: 16 },
      { source: 32, target: 14 },
      { source: 33, target: 4 },
      { source: 33, target: 34 },
      { source: 33, target: 35 },
      { source: 33, target: 36 },
      { source: 33, target: 37 },
      { source: 33, target: 38 },
      { source: 34, target: 8 },
      { source: 35, target: 10 },
      { source: 36, target: 5 },
      { source: 37, target: 33 },
      { source: 38, target: 33 },
      { source: 39, target: 22 }, // healthcare to health
      { source: 40, target: 5 },  // airplane to globe
      { source: 41, target: 1 },  // factory to tools
      { source: 42, target: 16 }, // book to document
      { source: 43, target: 22 }, // cross to health
      { source: 44, target: 40 }, // plane to airplane
      { source: 0, target: 45 },  // user to money
      { source: 0, target: 46 },  // user to bank
      { source: 0, target: 47 },  // user to utensils
      { source: 0, target: 48 },  // user to currency
      { source: 45, target: 24 }, // money to cart
      { source: 46, target: 4 },  // bank to database
      { source: 47, target: 25 }, // utensils to church
      { source: 48, target: 45 },  // currency to money
      { source: 49, target: 24 }, // pharmacy to cart
      { source: 50, target: 4 },  // hospital to database
      { source: 51, target: 25 }, // construction to church
      { source: 52, target: 45 }, // weather to cart
      { source: 53, target: 24 }, // mountain to cart
      { source: 54, target: 45 }, // dog to cart
      { source: 55, target: 45 }, // cat to cart
      { source: 56, target: 45 }, // bird to cart
      { source: 57, target: 25 }, // chef hat to church
      { source: 58, target: 45 }, // dumbbells to cart
      { source: 59, target: 25 }, // idea to church
      { source: 60, target: 45 },  // star to cart
      { source: 61, target: 5 },  // facebook to globe
      { source: 62, target: 2 },  // github to server
      { source: 63, target: 5 },  // tiktok to globe
      { source: 64, target: 5 },  // twitter to globe
      { source: 65, target: 3 },  // ai to robot
      { source: 66, target: 5 },  // google to globe
      { source: 67, target: 15 }, // linkedin to users
      { source: 68, target: 27 }  // instagram to image
    ]

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create a group for links that will be rendered first (below nodes)
    const linkGroup = svg.append('g')
      .attr('class', 'links')

    // Create a group for nodes that will be rendered second (above links)
    const nodeGroup = svg.append('g')
      .attr('class', 'nodes')

    // Create the links
    const link = linkGroup.selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', '#ccc')
      .style('stroke-opacity', 0.1)
      .style('stroke-width', 2)

    // Create the node groups
    const node = nodeGroup.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node-group')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)

    // Add circles to each node
    node.append('circle')
      .attr('class', 'node')
      .attr('r', 30)
      .style('fill', '#f0f0f0')
      .style('fill-opacity', 0.2)
      .style('stroke', '#ddd')
      .style('stroke-opacity', 0.1)
      .style('stroke-width', 2)
      .style('cursor', 'grab')

    // Add icons to each node using React Icons
    node.each(function(d) {
      const iconGroup = d3.select(this)
      
      // Create a foreignObject to embed React Icons
      const fo = iconGroup.append('foreignObject')
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', -20)
        .attr('y', -20)
        .style('pointer-events', 'none')
      
      // Create a div inside the foreignObject
      const div = fo.append('xhtml:div')
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
      
      // Create a div for the icon
      const iconElement = document.createElement('div')
      iconElement.style.color = 'rgba(85, 85, 85, 0.2)'
      iconElement.style.fontSize = '24px'
      
      // Map icon names to React Icons components
      let iconSvg
      switch(d.icon) {
        case 'database':
          iconSvg = renderToStaticMarkup(<FaDatabase />)
          break
        case 'calendar':
          iconSvg = renderToStaticMarkup(<FaCalendar />)
          break
        case 'tools':
          iconSvg = renderToStaticMarkup(<FaTools />)
          break
        case 'globe':
          iconSvg = renderToStaticMarkup(<FaGlobe />)
          break
        case 'robot':
          iconSvg = renderToStaticMarkup(<FaRobot />)
          break
        case 'server':
          iconSvg = renderToStaticMarkup(<FaServer />)
          break
        case 'chart':
          iconSvg = renderToStaticMarkup(<FaChartLine />)
          break
        case 'user':
          iconSvg = renderToStaticMarkup(<FaUser />)
          break
        case 'mobile':
          iconSvg = renderToStaticMarkup(<FaMobile />)
          break
        case 'cloud':
          iconSvg = renderToStaticMarkup(<FaCloud />)
          break
        case 'api':
          iconSvg = renderToStaticMarkup(<FaCode />)
          break
        case 'display':
          iconSvg = renderToStaticMarkup(<FaDesktop />)
          break
        case 'chatbot':
          iconSvg = renderToStaticMarkup(<FaComments />)
          break
        case 'map':
          iconSvg = renderToStaticMarkup(<FaMap />)
          break
        case 'camera':
          iconSvg = renderToStaticMarkup(<FaCamera />)
          break
        case 'car':
          iconSvg = renderToStaticMarkup(<FaCar />)
          break
        case 'users':
          iconSvg = renderToStaticMarkup(<FaUsers />)
          break
        case 'document':
          iconSvg = renderToStaticMarkup(<FaFileAlt />)
          break
        case 'search':
          iconSvg = renderToStaticMarkup(<FaSearch />)
          break
        case 'microphone':
          iconSvg = renderToStaticMarkup(<FaMicrophone />)
          break
        case 'tree':
          iconSvg = renderToStaticMarkup(<FaTree />)
          break
        case 'waves':
          iconSvg = renderToStaticMarkup(<FaWater />)
          break
        case 'health':
          iconSvg = renderToStaticMarkup(<FaHeartbeat />)
          break
        case 'map-marker':
          iconSvg = renderToStaticMarkup(<FaMapMarkerAlt />)
          break
        case 'cart':
          iconSvg = renderToStaticMarkup(<FaShoppingCart />)
          break
        case 'church':
          iconSvg = renderToStaticMarkup(<FaChurch />)
          break
        case 'translate':
          iconSvg = renderToStaticMarkup(<FaLanguage />)
          break
        case 'image':
          iconSvg = renderToStaticMarkup(<FaImage />)
          break
        case 'heart':
          iconSvg = renderToStaticMarkup(<FaHeart />)
          break
        case 'hotel':
          iconSvg = renderToStaticMarkup(<FaHotel />)
          break
        case 'train':
          iconSvg = renderToStaticMarkup(<FaTrain />)
          break
        case 'cap':
          iconSvg = renderToStaticMarkup(<FaGraduationCap />)
          break
        case 'bus':
          iconSvg = renderToStaticMarkup(<FaBus />)
          break
        case 'shield':
          iconSvg = renderToStaticMarkup(<FaShieldAlt />)
          break
        case 'wifi':
          iconSvg = renderToStaticMarkup(<FaWifi />)
          break
        case 'controller':
          iconSvg = renderToStaticMarkup(<FaGamepad />)
          break
        case 'satellite':
          iconSvg = renderToStaticMarkup(<FaSatellite />)
          break
        case 'fingerprint':
          iconSvg = renderToStaticMarkup(<FaFingerprint />)
          break
        case 'lock':
          iconSvg = renderToStaticMarkup(<FaLock />)
          break
        case 'healthcare':
          iconSvg = renderToStaticMarkup(<FaHospital />)
          break
        case 'airplane':
          iconSvg = renderToStaticMarkup(<FaPlane />)
          break
        case 'book':
          iconSvg = renderToStaticMarkup(<FaBook />)
          break
        case 'cross':
          iconSvg = renderToStaticMarkup(<FaCross />)
          break
        case 'plane':
          iconSvg = renderToStaticMarkup(<FaPlane />)
          break
        case 'money':
          iconSvg = renderToStaticMarkup(<FaMoneyBill />)
          break
        case 'bank':
          iconSvg = renderToStaticMarkup(<FaUniversity />)
          break
        case 'utensils':
          iconSvg = renderToStaticMarkup(<FaUtensils />)
          break
        case 'currency':
          iconSvg = renderToStaticMarkup(<FaDollarSign />)
          break
        case 'pharmacy':
          iconSvg = renderToStaticMarkup(<FaPrescriptionBottleAlt />)
          break
        case 'hospital':
          iconSvg = renderToStaticMarkup(<FaHospital />)
          break
        case 'construction':
          iconSvg = renderToStaticMarkup(<FaHardHat />)
          break
        case 'weather':
          iconSvg = renderToStaticMarkup(<FaCloudSun />)
          break
        case 'mountain':
          iconSvg = renderToStaticMarkup(<FaMountain />)
          break
        case 'dog':
          iconSvg = renderToStaticMarkup(<FaDog />)
          break
        case 'cat':
          iconSvg = renderToStaticMarkup(<FaCat />)
          break
        case 'bird':
          iconSvg = renderToStaticMarkup(<FaDove />)
          break
        case 'chef-hat':
          iconSvg = renderToStaticMarkup(<FaUtensils />)  // Using utensils as substitute
          break
        case 'dumbbells':
          iconSvg = renderToStaticMarkup(<FaDumbbell />)
          break
        case 'idea':
          iconSvg = renderToStaticMarkup(<FaLightbulb />)
          break
        case 'star':
          iconSvg = renderToStaticMarkup(<FaStar />)
          break
        case 'facebook':
          iconSvg = renderToStaticMarkup(<FaFacebook />)
          break
        case 'github':
          iconSvg = renderToStaticMarkup(<FaGithub />)
          break
        case 'tiktok':
          iconSvg = renderToStaticMarkup(<FaTiktok />)
          break
        case 'twitter':
          iconSvg = renderToStaticMarkup(<FaTwitter />)
          break
        case 'ai':
          iconSvg = renderToStaticMarkup(<FaRobot />)  // Using robot icon for AI
          break
        case 'google':
          iconSvg = renderToStaticMarkup(<FaGoogle />)
          break
        case 'linkedin':
          iconSvg = renderToStaticMarkup(<FaLinkedin />)
          break
        case 'instagram':
          iconSvg = renderToStaticMarkup(<FaInstagram />)
          break
        default:
          iconSvg = renderToStaticMarkup(<FaGlobe />)
      }
      
      iconElement.innerHTML = iconSvg
      const divNode = div.node() as HTMLElement
      if (divNode) {
        divNode.appendChild(iconElement)
      }
    })

    // Create a simulation with forces - adjust strength and distance for more nodes
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(300))
      .force('charge', d3.forceManyBody().strength(-900))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(80))
      .force('x', d3.forceX(width / 2).strength(0.03))
      .force('y', d3.forceY(height / 2).strength(0.03))

    // Update the simulation on tick
    simulation.on('tick', () => {
      // Calculate line endpoints to stop at node boundaries
      svg.selectAll('line')
        .attr('x1', (d: any) => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          // Get the direction vector
          const dx = target.x! - source.x!
          const dy = target.y! - source.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          // If nodes are on top of each other, just return the source position
          if (dr === 0) return source.x!
          
          // Calculate the point on the edge of the source node
          // 30 is the node radius
          return source.x! + dx * 30 / dr
        })
        .attr('y1', (d: any) => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          const dx = target.x! - source.x!
          const dy = target.y! - source.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          if (dr === 0) return source.y!
          
          return source.y! + dy * 30 / dr
        })
        .attr('x2', (d: any) => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          const dx = source.x! - target.x!
          const dy = source.y! - target.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          if (dr === 0) return target.x!
          
          return target.x! + dx * 30 / dr
        })
        .attr('y2', (d: any) => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          const dx = source.x! - target.x!
          const dy = source.y! - target.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          if (dr === 0) return target.y!
          
          return target.y! + dy * 30 / dr
        })

      node
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
    })

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      svg.attr('width', width).attr('height', height)
      simulation.force('center', d3.forceCenter(width / 2, height / 2))
      simulation.alpha(0.3).restart()
    }

    window.addEventListener('resize', handleResize)

    // Add automatic movement with more dynamic behavior
    const moveRandomNode = () => {
      // Don't move the user node (id 0)
      const randomIndex = Math.floor(Math.random() * (nodes.length - 1)) + 1
      const node = nodes[randomIndex]
      
      // Apply a stronger random nudge for more movement
      const nudgeX = (Math.random() - 0.5) * 200
      const nudgeY = (Math.random() - 0.5) * 200
      
      // Allow more movement but still keep within viewport
      node.fx = Math.max(50, Math.min(width - 50, (node.x || width/2) + nudgeX))
      node.fy = Math.max(50, Math.min(height - 50, (node.y || height/2) + nudgeY))
      
      // Heat up the simulation more
      simulation.alpha(0.5).restart()
      
      // Release the node after a delay
      setTimeout(() => {
        node.fx = null
        node.fy = null
      }, 1500)
    }

    // Move nodes more frequently
    const movementInterval = setInterval(moveRandomNode, 2000)

    // Occasionally apply a larger "shake" to the whole network
    const shakeNetwork = () => {
      nodes.forEach((node, i) => {
        // Skip the user node
        if (i === 0) return
        
        // Apply a small force to each node
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 50
        const nudgeX = Math.cos(angle) * distance
        const nudgeY = Math.sin(angle) * distance
        
        // Apply the force
        if (node.vx && node.vy) {
          node.vx += nudgeX
          node.vy += nudgeY
        }
      })
      
      simulation.alpha(0.3).restart()
    }

    const shakeInterval = setInterval(shakeNetwork, 10000)

    // Function to randomly change connections
    const changeConnections = () => {
      // Keep track of all possible connections
      const allPossibleLinks: Link[] = []
      
      // Generate all possible connections except for user node (id 0)
      // User node should always stay connected to all other nodes
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          allPossibleLinks.push({ source: i, target: j })
        }
      }
      
      // Filter out current non-user links
      const currentNonUserLinks = links.filter(
        link => link.source !== 0 && link.target !== 0
      )
      
      // Randomly remove 5 existing non-user connections
      if (currentNonUserLinks.length > 5) {
        const numToRemove = 5;
        for (let i = 0; i < numToRemove; i++) {
          if (currentNonUserLinks.length > 0) {
            const indexToRemove = Math.floor(Math.random() * currentNonUserLinks.length)
            const linkToRemove = currentNonUserLinks[indexToRemove]
            
            // Find and remove this link from the main links array
            const mainIndex = links.findIndex(
              link => 
                (link.source === linkToRemove.source && link.target === linkToRemove.target) ||
                (link.source === linkToRemove.target && link.target === linkToRemove.source)
            )
            
            if (mainIndex !== -1) {
              links.splice(mainIndex, 1)
            }
            
            // Remove from our tracking array too
            currentNonUserLinks.splice(indexToRemove, 1)
          }
        }
      }
      
      // Add 5 new random connections
      const numToAdd = 5;
      
      // Filter out connections that already exist
      const possibleNewLinks = allPossibleLinks.filter(newLink => 
        !links.some(existingLink => 
          (existingLink.source === newLink.source && existingLink.target === newLink.target) ||
          (existingLink.source === newLink.target && existingLink.target === newLink.source)
        )
      )
      
      // Add new random connections
      for (let i = 0; i < numToAdd && possibleNewLinks.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleNewLinks.length)
        links.push(possibleNewLinks[randomIndex])
        possibleNewLinks.splice(randomIndex, 1)
      }
      
      // Update the visualization
      svg.select('.links').remove()
      const linkGroup = svg.append('g')
        .attr('class', 'links')

      // Recreate the links
      const link = linkGroup.selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', '#ccc')
        .style('stroke-opacity', 0.1)
        .style('stroke-width', 2)
      
      // Update the simulation
      simulation.force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(300))
      simulation.alpha(0.5).restart()
      
      // Make sure the tick function knows about the new links
      simulation.on('tick', () => {
        svg.selectAll('line')
          .attr('x1', (d: any) => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            // Get the direction vector
            const dx = target.x! - source.x!
            const dy = target.y! - source.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            // If nodes are on top of each other, just return the source position
            if (dr === 0) return source.x!
            
            // Calculate the point on the edge of the source node
            // 30 is the node radius
            return source.x! + dx * 30 / dr
          })
          .attr('y1', (d: any) => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            const dx = target.x! - source.x!
            const dy = target.y! - source.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return source.y!
            
            return source.y! + dy * 30 / dr
          })
          .attr('x2', (d: any) => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            const dx = source.x! - target.x!
            const dy = source.y! - target.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return target.x!
            
            return target.x! + dx * 30 / dr
          })
          .attr('y2', (d: any) => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            const dx = source.x! - target.x!
            const dy = source.y! - target.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return target.y!
            
            return target.y! + dy * 30 / dr
          })

        node
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
      })
    }

    // Change connections every second
    const connectionInterval = setInterval(changeConnections, 1000)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      simulation.stop()
      clearInterval(movementInterval)
      clearInterval(shakeInterval)
      clearInterval(connectionInterval)
    }
  }, [])

  return (
    <svg 
      ref={svgRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'block',
        background: 'transparent'
      }}
    />
  )
} 