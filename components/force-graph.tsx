'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { FaDatabase, FaCalendar, FaTools, FaGlobe, FaRobot, FaServer, FaChartLine, FaUser } from 'react-icons/fa'

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
      { id: 6, icon: 'chart', x: width/2, y: 2*height/3 }
    ]
    
    // Define links between nodes to form triangular structures with user at center
    const links: Link[] = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 0, target: 5 },
      { source: 0, target: 6 }, // User connected to all nodes
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 3, target: 1 },
      { source: 4, target: 2 }
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
      .style('stroke-opacity', 0.2)
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
      .style('fill-opacity', 0.3)
      .style('stroke', '#ddd')
      .style('stroke-opacity', 0.2)
      .style('stroke-width', 2)
      .style('cursor', 'grab')

    // Add icons to each node
    node.each(function(d) {
      const iconGroup = d3.select(this)
      
      // Create a foreignObject to embed SVG icons
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
      
      // Append the appropriate icon based on the node's icon property
      const iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      iconElement.setAttribute('width', '24')
      iconElement.setAttribute('height', '24')
      iconElement.setAttribute('viewBox', '0 0 16 16')
      iconElement.setAttribute('fill', 'rgba(85, 85, 85, 0.3)')
      
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      
      // Set the path data based on the icon type
      switch(d.icon) {
        case 'robot':
          iconPath.setAttribute('d', 'M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z')
          break
        case 'tools':
          iconPath.setAttribute('d', 'M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z')
          break
        case 'server':
          iconPath.setAttribute('d', 'M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z')
          iconPath.setAttribute('fill-rule', 'evenodd')
          iconElement.appendChild(iconPath)
          
          const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          path2.setAttribute('d', 'M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z')
          path2.setAttribute('fill-rule', 'evenodd')
          iconElement.appendChild(path2)
          
          const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          path3.setAttribute('d', 'M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z')
          path3.setAttribute('fill-rule', 'evenodd')
          iconElement.appendChild(path3)
          break
        case 'user':
          iconPath.setAttribute('d', 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z')
          break
        case 'database':
          iconPath.setAttribute('d', 'M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z')
          break
        case 'globe':
          iconPath.setAttribute('d', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z')
          break
        case 'chart':
          iconPath.setAttribute('d', 'M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z')
          break
        case 'calendar':
          iconPath.setAttribute('d', 'M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V2zm3 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6zm-1 2H6v8h6V6zm2 0v8h2V6h-2zm-1-7a1 1 0 0 0-1 1v1h2V2a1 1 0 0 0-1-1z')
          break
        case 'mobile':
          iconPath.setAttribute('d', 'M12 1a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5h5zm-1 10V7h-3v4h3zm0-5V6h-3v4h3z')
          break
      }
      
      iconElement.appendChild(iconPath)
      const divNode = div.node()
      if (divNode) {
        divNode.appendChild(iconElement)
      }
    })

    // Create a simulation with forces
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(400))
      .force('charge', d3.forceManyBody().strength(-1100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(110))
      .force('x', d3.forceX(width / 2).strength(0.03))
      .force('y', d3.forceY(height / 2).strength(0.03))

    // Update the simulation on tick
    simulation.on('tick', () => {
      // Calculate line endpoints to stop at node boundaries
      svg.selectAll('line')
        .attr('x1', d => {
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
        .attr('y1', d => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          const dx = target.x! - source.x!
          const dy = target.y! - source.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          if (dr === 0) return source.y!
          
          return source.y! + dy * 30 / dr
        })
        .attr('x2', d => {
          const source = d.source as unknown as Node
          const target = d.target as unknown as Node
          
          const dx = source.x! - target.x!
          const dy = source.y! - target.y!
          const dr = Math.sqrt(dx * dx + dy * dy)
          
          if (dr === 0) return target.x!
          
          return target.x! + dx * 30 / dr
        })
        .attr('y2', d => {
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
      
      // Randomly remove 1-2 existing non-user connections
      if (currentNonUserLinks.length > 2) {
        const numToRemove = Math.floor(Math.random() * 2) + 1
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
      
      // Add 1-2 new random connections
      const numToAdd = Math.floor(Math.random() * 2) + 1
      
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
        .style('stroke-opacity', 0.2)
        .style('stroke-width', 2)
      
      // Update the simulation
      simulation.force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(400))
      simulation.alpha(0.5).restart()
      
      // Make sure the tick function knows about the new links
      simulation.on('tick', () => {
        svg.selectAll('line')
          .attr('x1', d => {
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
          .attr('y1', d => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            const dx = target.x! - source.x!
            const dy = target.y! - source.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return source.y!
            
            return source.y! + dy * 30 / dr
          })
          .attr('x2', d => {
            const source = d.source as unknown as Node
            const target = d.target as unknown as Node
            
            const dx = source.x! - target.x!
            const dy = source.y! - target.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return target.x!
            
            return target.x! + dx * 30 / dr
          })
          .attr('y2', d => {
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

    // Change connections periodically
    const connectionInterval = setInterval(changeConnections, 8000)

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